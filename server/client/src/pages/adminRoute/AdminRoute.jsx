import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


const AdminRoute = () => {
  const {userInfo} = useSelector(state => state.auth)
  return  userInfo ? (
    <div>
      <Outlet/>
    </div> 
  ) : 
  (
    <Navigate to='/login'/>
  )
  
}

export default AdminRoute
