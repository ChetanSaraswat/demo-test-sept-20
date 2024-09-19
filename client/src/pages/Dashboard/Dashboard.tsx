import ActionAreaCard from '../../component/Card/card'
import RestaurantFormDialog from '../../component/RestroForm/restroform'
import MenuComponent from '../../component/RestroMenuOwner/menu'

function Dashboard() {

  return (
    <div className=" dashboard-container">
<RestaurantFormDialog/>
<ActionAreaCard/>
<MenuComponent/>
</div>
  )
}

export default Dashboard
