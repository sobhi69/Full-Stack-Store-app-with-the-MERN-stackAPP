import { FC, FormEvent, useState } from 'react'
import SignInInterface from '../../interfaces/SignInForm'
import './auth.css'
import useAuth from '../../hooks/useAuth'
import useIsRegistring from '../../hooks/useIsRegistring'

interface SignInProps {
}

const Header: FC = () => {
    const { setIsRegistering } = useIsRegistring()

    return (
        <header className='auth-header'>
            <h1>Easy To Earn</h1>
            <button onClick={() => setIsRegistering(true)}>Register</button>
        </header>
    )
}

interface SignInFormProps {
}

const SignInForm: FC<SignInFormProps> = ({ }) => {
    const { signIn } = useAuth()
    const { setIsRegistering } = useIsRegistring()
    const [form, setForm] = useState<SignInInterface>({
        email: "",
        password: ""
    })

    const updateForm = (prop: any) => {
        setForm(prev => {
            return { ...prev, ...prop }
        })
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await signIn(form)

    }

    return (
        <div className='form'>
            <h2>Auth</h2>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className="group-form">
                    <label htmlFor="email">Email</label>
                    <input
                        value={form.email}
                        onChange={(e) => updateForm({ email: e.target.value })}
                        type="email"
                        id='email'
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
                <input type="submit" value="Sign in" className='btn submit-btn' />
            </form>
            <div>
                <p>if you don'y already have an account go and Register </p>
                {/* <Link to='/register'>Regsiter</Link> */}
                <button onClick={() => setIsRegistering(true)}>Register</button>
            </div>
        </div>
    )
}


const SignIn: FC<SignInProps> = ({ }) => {
    return (
        <div className='auth-page'>
            <Header />
            <SignInForm />
        </div>
    )
}

export default SignIn;