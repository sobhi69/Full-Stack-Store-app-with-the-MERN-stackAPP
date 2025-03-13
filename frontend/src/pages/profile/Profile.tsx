import { FC, FormEvent, useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { axiosInstance } from '../../api/axiosInstance'
import UserUpdateData from '../../interfaces/UserUpdateData'

interface ProfileProps {

}

const Header: FC = () => {
  return (
    <header className='easy-header'>
      <h1>Easy To Earn</h1>
      <Link to={'/easy-to-earn'}>go Back</Link>
    </header>
  )
}


const Profile: FC<ProfileProps> = ({ }) => {

  const { user, updateUser } = useAuth()
  const id = user?._id
  const [form, setForm] = useState<UserUpdateData>({
    username: "",
    email: "",
    confirmPassword: "",
    oldPassword:"",
    newPassword:"",
    phone: "",
    _id: "",
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}`)
        setForm(response.data)
      } catch (error: any) {
        const errMess = await error.response.data.message
        alert(errMess)
      }
    }

    getData()
  }, [])


  const updateForm = (prop: any) => {
    setForm(prev => {
      return { ...prev, ...prop }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const {username,email,newPassword,oldPassword,confirmPassword,phone,_id} = form
    await updateUser({username,oldPassword,newPassword,confirmPassword,phone,_id,email})

  }

  return (
    <div>
      <Header />
      <div className='form'>
        <h2>edit profile</h2>
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
            <label htmlFor="oldPassword">Ole Password</label>
            <input
              onChange={(e) => updateForm({ oldPassword: e.target.value })}
              type="password"
              id='oldPassword'
              min={6}
              max={20}
              placeholder='password' />
          </div>
          <div className="group-form">
            <label htmlFor="newPassword">new Password</label>
            <input
              onChange={(e) => updateForm({ newPassword: e.target.value })}
              type="password"
              id='newPassword'
              min={6}
              max={20}
              placeholder='new passowrd' />
          </div>
          <div className="group-form">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
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
              value={form.phone}
              onChange={(e) => updateForm({ phone: e.target.value })}
              type="tel"
              id='phone'
              min={11}
              max={11}
              placeholder='+2010..' />
          </div>

          <input type="submit" value="Update" className='btn submit-btn' />
        </form>
      </div>
    </div>
  )
}

export default Profile;