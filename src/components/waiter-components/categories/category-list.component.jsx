import { useEffect } from "react";
import CategoryCard from "./category-card.component";
import './categoryList.styles.css'
import { RequestData } from "../../../Waiter redux elements/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        isPending: state.RequestData.isPending,
        error: state.RequestData.error,
        Categories: state.RequestData.dataRequested
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        RequestData: (url, body) => dispatch(RequestData(url, body))
    }
}

const Categories = (props) => {

    const {Categories, RequestData, isPending} = props

    useEffect(()=> {

        RequestData('http://localhost:8000/categories', {
            type: 'read',
            // verificationData: props.employeeData
        })
    }, [])
    return isPending?
        <h1>Loading</h1>:
    (
        <div className="category-list">
            {Categories.map((category)=> {
                return <CategoryCard data={category}/>
            })}
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
