/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useLoginMutation } from "../redux/api/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/features/auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [required, setRequired] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login] = useLoginMutation()
  const {userInfo} = useSelector((state) => state.auth)

  useEffect(()=> {
    if(userInfo) {
      navigate("/dashboard")
    }
  },[navigate, userInfo ])


  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!username || !password) {
      setRequired(true)
    } else {
      try {
        const res = await login({username, password}).unwrap()
        setRequired(false)
        dispatch(setCredentials({...res}))
        navigate('/dashboard')

      } catch (error) {
        setRequired(false)
      }
    }

  }  

  return (
    <div className='w-full min-h-screen bg-fixed bg-cover flex items-center justify-center' style={{backgroundImage: `url(/BA_BG.jpg)`}}>
      <div className='bg-white/20 shadow-md shadow-black/40 w-96 min-h-72 backdrop-blur-sm flex flex-col items-center justify-center px-5 gap-4 rounded-md py-10'>
        <h1 className='text-2xl font-bold text-blue-500'>Bernales & Associates</h1>
        <p className='text-4xl font-black w-full text-center'>Login</p>
        <form className='w-full flex flex-col' onSubmit={handleSubmit}>
          {
            required &&
            <p className="text-center text-red-500 text-sm font-bold">All fields are required.</p>
          }
          <label>
            <span className='text-xl font-bold'>Username</span>
            <input type="text" className='w-full py-2 px-3' value={username} onChange={(e)=> setUsername(e.target.value)}/>
          </label>
          <label>
            <span className='text-xl font-bold'>Password</span>
            <input type="password" className='w-full py-2 px-3' value={password} onChange={(e)=> setPassword(e.target.value)} />
          </label>

          <button className='mt-5 border-2 border-blue-500 py-2 bg-blue-500 text-white font-bold text-2xl rounded shadow-md shadow-black/60'>Login</button>
        </form>
      
      
      </div>
    </div>
  )
}
export default Login