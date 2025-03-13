import { FC } from 'react'
import Register from './Register';
import SignIn from './SignIn';
import useIsRegistring from '../../hooks/useIsRegistring';

interface AuthProps {

}

const Auth: FC<AuthProps> = ({ }) => {
    const {isRegistering}= useIsRegistring()
    return (
        <div>
            {isRegistering
                ? <Register />
                : <SignIn  />}
        </div>
    )
}

export default Auth;