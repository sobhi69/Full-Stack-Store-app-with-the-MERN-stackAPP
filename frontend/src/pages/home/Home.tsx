import { FC } from 'react'
import './home.css'
import { Link } from 'react-router-dom'

interface HomeProps {

}

// so right now we wnna take care of creating 
// and authranticating a new user 


const Home: FC<HomeProps> = ({ }) => {
    return (
        <div className='home-page'>
            <p>get Started with </p>
            <h2 className='heading'>Easy To Earn</h2>
            <div className='links'>
                <Link className='link' to="/sign-in">Sign in</Link>
                <Link className='link' to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Home;