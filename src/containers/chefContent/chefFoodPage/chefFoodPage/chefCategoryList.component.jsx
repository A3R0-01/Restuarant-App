import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AddingElementToRecords, GetChefCategories } from "../../../../Chef redux elements/actions";
import ChefCategoryCard from "./chefCategoryCard.component";
import './chefCategory.css'

const mapStateToProps = (state) => {
    return {
        EmployeeData: state.ChefAppData.ChefData,
        CategoryList: state.ChefAppData.CategoryList,
        CategoryListPending: state.ChefAppData.CategoryListPending,
        CategoryListError: state.ChefAppData.CategoryListError,
        MenuList: state.RequestData.dataRequested,
        MenuPending: state.RequestData.isPending,
        MenuError: state.RequestData.error,
        UpdatePending: state.ChefAppData.UpdatePending,
        UpdateId: state.ChefAppData.UpdateId,
        UpdateError: state.ChefAppData.Update,
        CreateElementPending: state.ChefAppData.CreateElementPending,
        CreateElementResponse: state.ChefAppData.CreateElementResponse,
        CreateElementError: state.ChefAppData.CreateElementError,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetCategoryList: (body) => dispatch(GetChefCategories(body)),
        AddElement: (url, body) => dispatch(AddingElementToRecords(url, body))
    }
}
const ChefCategoryList = (props) => {
    const {
        EmployeeData,
        CategoryList,
        CategoryListPending,
        CategoryListError,
        CreateElementPending,
        CreateElementResponse,
        CreateElementError,
        AddElement,
        GetCategoryList,

    } = props
    const [addTable, setAddTable] = useState(false)
    const [categoryName, setCategoryName] = useState('n/a')
    useEffect(() => {
        GetCategoryList({ type: 'categories/read', EmployeeData: EmployeeData })
    }, [])

    return (
        <div className="food-page-container">
            <div className="chef-category-page-headings">
                {
                    CategoryListPending ? <h2>Categories Pending</h2>
                        : CategoryListError ? <h2>Failed to fetch categories</h2>
                            : CreateElementError ? <h2>Failed To Add Category</h2>
                                : CreateElementPending ? <h2>Adding Category</h2>
                                    : CreateElementResponse === 'AddCategory/UNSUCCESSFUL' ? <h2>Something went wrong</h2>
                                        : CreateElementResponse === 'AddCategory/SUCCESSFUL' ? <h2> Category Added</h2>
                                            : <h2>Category List</h2>
                }
            </div>
            <div className="chef-category-list-heading chef-category-details">
                <div>Id</div>
                <div>Name</div>
                <div>Dishes</div>
                <div>State:</div>
            </div>
            <div onClick={() =>
                GetCategoryList({ type: 'categories/read', EmployeeData: EmployeeData })
            } className="refresh-categories button">Refresh</div>
            <div className="chef-category-list">
                {
                    CategoryList.map(data => {
                        return (
                            <ChefCategoryCard category={data} />
                        )
                    })
                }
            </div>
            <div className="add-category-section">
                {
                    addTable ?
                        <center className="add-category-form">
                            Category Name: <input type="text" onChange={(event) => setCategoryName(event.target.value)} /><br />
                            <center className="chef-category-button-grp">
                                <div onClick={() => AddElement('http://localhost:8001/categories', {
                                    type: 'categories/create',
                                    CategoryName: categoryName
                                })} className="button">
                                    Add Table</div>
                                <div className="button"
                                onClick={() => setAddTable(!addTable)}>Cancel</div>
                            </center>
                        </center>
                        :
                        <div className="button" onClick={() => setAddTable(!addTable)}>Add Table</div>
                }
            </div>
        </div>

    )

}
export default connect(mapStateToProps, mapDispatchToProps)(ChefCategoryList);