import FilterComponent from "./Filter.component"
import FoodListComponent from "./foodList.component"


const FoodBody = () => {

    return(
        <div className="menu-page">
        <FilterComponent/>
        <FoodListComponent />
        </div>
    )
}

export default FoodBody