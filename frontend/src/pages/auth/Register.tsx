import { FC, FormEvent, useState } from 'react'
import RegisterInterface from '../../interfaces/RegisterForm'
import './auth.css'
import useAuth from '../../hooks/useAuth'
import useIsRegistring from '../../hooks/useIsRegistring'

interface RegisterProps {
}

const Header: FC = () => {
    const {setIsRegistering} = useIsRegistring()
    
    return (
        <header className='auth-header'>
            <h1>Easy To Earn</h1>
            <button onClick={() => setIsRegistering(false)}>Sign in</button>
        </header>
    )
}

const RegisterForm: FC = ({}) => {
    const { register } = useAuth()
    const {setIsRegistering} = useIsRegistring()

    const [form, setForm] = useState<RegisterInterface>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "User"
    })


    const updateForm = (prop: any) => {
        setForm(prev => {
            return { ...prev, ...prop }
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const res = await register(form)
        if (res) {
            setIsRegistering(false)
        }
    }


    return (
        <div className='form'>
            <h2>Create an account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="group-form">
                    <label htmlFor="username">User name</label>
                    <input
                        value={form.username}
                        onChange={(e) => updateForm({ username: e.target.value })}
                        type="text"
                        id='username'
                        placeholder='Enter your username' />

                </div>
                <div className="group-form">
                    <label htmlFor="email">Email</label>
                    <input
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                        type="email"
                        id='email'
                        required
                        placeholder='Enter your email' />
                </div>
                <div className="group-form">
                    <label htmlFor="password">Password</label>
                    <input
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                        type="password"
                        id='password'
                        min={6}
                        max={20}
                        placeholder='password' />
                </div>
                <div className="group-form">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        value={form.confirmPassword}
                        onChange={(e) => updateForm({ confirmPassword: e.target.value })}
                        type="password"
                        id='confirmPassword'
                        min={6}
                        max={20}
                        placeholder='Confirm Password' />
                </div>
                <div className="group-form">
                    <label htmlFor="phone">Phone</label>
                    <input
                        onChange={(e) => updateForm({ phone: e.target.value })}
                        type="tel"
                        id='phone'
                        min={11}
                        max={11}
                        placeholder='+2010..' />
                </div>
                <div className="group-form">
                    <label htmlFor="phone">role</label>
                    <select onChange={(e) => updateForm({ role: e.target.value })}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <input type="submit" value="Submit" className='btn submit-btn' />
            </form>
            <div>
                <p>if you already have an account go and Sign in </p>
                <button onClick={() => setIsRegistering(false)}>Sign in</button>
                {/* <Link to='/sign-in'>Sign in</Link> */}
            </div>
        </div>
    )
}


const Register: FC<RegisterProps> = ({ }) => {
    return (
        <div className='auth-page'>
            <Header />
            <RegisterForm  />
        </div>
    )
}

export default Register;