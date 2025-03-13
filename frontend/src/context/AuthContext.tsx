import { createContext, FC, ReactNode, useEffect, useState } from "react";
import UserProfile from "../interfaces/UserProfile";
import SignInForm from "../interfaces/SignInForm";
import RegisterForm from "../interfaces/RegisterForm";
import { axiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import UserUpdateData from "../interfaces/UserUpdateData";

type AuthContextType = {
    user: UserProfile | null,
    signIn: (data: SignInForm) => Promise<void>,
    register: (data: RegisterForm) => Promise<boolean | undefined>,
    logout: () => void,
    updateUser: (data: UserUpdateData) => Promise<void>,
    isLoading: boolean,
    error: Error | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const userFromLocalstorage = localStorage.getItem('user')
        if (userFromLocalstorage) {
            setUser(JSON.parse(userFromLocalstorage))
        }

    }, [])

    const signIn = async (userInfo: SignInForm) => {
        const { email, password } = userInfo
        setIsLoading(true)
        if (!email || !password) {
            alert('please provide the email and password')
            return
        }

        const userData = { email, password }
        try {
            const response = await axiosInstance.post('/auth/sign-in', userData)
            setUser(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
            navigate('/easy-to-earn')
        } catch (error: any) {

            alert(error?.response?.data?.message)
            setError(error)
            return
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (userInfo: RegisterForm) => {
        const { username, email, password, confirmPassword } = userInfo

        setIsLoading(true)

        if (
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert('please fill out the entire form')
            return
        }

        if (password != confirmPassword) {
            alert("password and confirmPassword donn't match ")
            return
        }

        try {
            await axiosInstance.post('/auth/register', userInfo)
            return true
            // setUser(response.data)
            // navigate('/sign-in')
        } catch (error: any) {
            alert(error?.response?.data?.message)
            setError(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setIsLoading(true)
        try {
            await axiosInstance.get('/auth/logout')
            setUser(null)
            localStorage.removeItem('user')
            navigate('/sign-in')
        } catch (error: any) {
            alert(error?.response?.data?.message)
            setError(error)
            return
        } finally {
            setIsLoading(false)
        }
    }

    const updateUser = async (data: UserUpdateData) => {
        const { _id } = data
        try {
            const response = await axiosInstance.patch(`/user/${_id}`, data)
            setUser(response.data)
            navigate('/easy-to-earn')
        } catch (error: any) {
            alert(error?.response?.data?.message)
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            register,
            logout,
            updateUser,
            user,
            isLoading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
}