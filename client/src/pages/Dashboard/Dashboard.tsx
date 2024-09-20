import { useEffect } from 'react'
import ActionAreaCard from '../../component/Card/card'
import RestaurantFormDialog from '../../component/RestroForm/restroform'
import MenuComponent from '../../component/RestroMenuOwner/menu'

import { getRestaurant } from '../../feature/Restaurant/restaurant.action'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store/store'
import AddMenuDialogComponent from '../../component/RestroMenuOwner/OnlyMenu'
import { getMenuAction } from '../../feature/Restaurant/restaurant.type'
import { getAllMenu } from '../../feature/Restaurant/menu.action'

// import { getUserData } from '../../feature/Auth/auth.action'

      function Dashboard() {
        const dispatch =useAppDispatch()
      useEffect(()=>{  
        const params={page : 1}
      dispatch(getRestaurant(params))
      },[])
      const restro = useAppSelector((state:RootState)=>state.restaurant.myrestro)
      console.log('restro: ', restro);
if(restro){
  const params={restaurant_id : restro.restaurant_id}
  dispatch(getAllMenu(params))
}
        return (
          <div className=" dashboard-container">
      {!restro &&  <RestaurantFormDialog/>}
{restro && <ActionAreaCard restro={restro}/> }

     {restro && <AddMenuDialogComponent restro_id={restro?.restaurant_id} />}

     {  restro &&  <MenuComponent/>}
        </div>
        )
}

export default Dashboard
