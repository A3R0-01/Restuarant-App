import { useEffect } from "react";
import CategoryCard from "./category-card.component";
import { FetchCategories } from "../../../Waiter redux elements/actions";
import { connect } from "react-redux";

const mapStateToProps = ({CategoriesData, WaiterAppData}) => {
    return {
        isPending: CategoriesData.isPending,
        error: CategoriesData.error,
        Categories: CategoriesData.Data,
        EmployeeData: WaiterAppData.EmployeeData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        RequestData: (body) => dispatch(FetchCategories(body))
    }
}

const Categories = (props) => {

    const {Categories, RequestData, isPending, error, EmployeeData} = props

    useEffect(()=> {

        RequestData({
            type: 'categories/read',
            EmployeeData: EmployeeData
        })
    }, [])
    return isPending?
        <h1 className="text-center text-4xl sm:5xl md:text-6xl">Loading</h1>
        :error? <h1 className="text-center text-4xl sm:5xl md:text-6xl">An Error Occurred</h1>
    :(
        <div className="category-list ">
            {Categories.map((category)=> {
                return <CategoryCard data={category}/>
            })}
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
