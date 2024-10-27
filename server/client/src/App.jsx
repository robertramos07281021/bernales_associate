import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router"
import {useNavigate} from "react-router-dom"
import { useLogoutMutation } from "./redux/api/user"
import { logout } from "./redux/features/auth/authSlice"

const App = () => {
  const {userInfo} = useSelector((state) => state.auth)
  const [logoutUser] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  
  const hanldeLogout = async()=> {
    try{
      await logoutUser().unwrap()
      dispatch(logout())
      navigate("/")
    } catch(error) {
      console.log(error)
    }
  }


  return (
    <>
    {
      userInfo && 
      <header className="w-full flex justify-between px-5 absolute left-0 top-0 bg-white hover:shadow-md hover:shadow-black/30 duration-200 ease-in-out">
        <div className="flex items-center">
          <img src="/BA_LOGO.jpg" alt="BA_LOGO" className="w-16 h-16" />
          <p className="">
            Bernales & Associates
          </p>
        </div>
        <div className="flex items-center cursor-pointer hover:scale-110 font-bold" onClick={hanldeLogout}>Logout</div>
      </header>
    }
      <main className='h-screen w-full'>
        <Outlet/>
      </main>
    </>
  )
}
export default App
