import { useEffect } from 'react'
import ActionAreaCard from '../../component/Card/card'
import RestaurantFormDialog from '../../component/RestroForm/restroform'
import MenuComponent from '../../component/RestroMenuOwner/menu'
import { useAppDispatch } from '../../hooks'
import { getUserData } from '../../feature/Auth/auth.action'

function Dashboard() {
  const dispatch =useAppDispatch()
useEffect(()=>{
  const params={page : 1, size : 10, flag : 'name', designation : '', search : ''}
 dispatch(getUserData(params))
},[])
  return (
    <div className=" dashboard-container">
<RestaurantFormDialog/>
<ActionAreaCard/>
<MenuComponent/>
</div>
  )
}

export default Dashboard
