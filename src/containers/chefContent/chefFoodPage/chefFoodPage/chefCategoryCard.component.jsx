import { connect } from "react-redux"
import { DefaultObjectEdited, SetElementUpdate, SetObjectToExpand, SetObjectedEdited, UpdateElement } from "../../../../Chef redux elements/actions"
import { useEffect, useState } from "react"
import ChefFoodList from "../chefFoodList/chefFoodList.component"

const mapStateToProps = ({ RequestData, ChefAppData }) => {
    return {
        MenuList: RequestData.dataRequested,
        MenuPending: RequestData.isPending,
        MenuError: RequestData.error,
        ObjectToEdit: ChefAppData.ObjectEditedId,
        UpdatePending: ChefAppData.UpdatePending,
        UpdateId: ChefAppData.UpdateId,
        UpdateError: ChefAppData.UpdateError,
        CategoryToExpand: ChefAppData.ObjectToExpand,
        EmployeeData: ChefAppData.ChefData,
        ElementUpdate: ChefAppData.ElementUpdated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        DefaultObjectEdited: () => dispatch(DefaultObjectEdited()),
        SetObjectEdited: (objectId) => dispatch(SetObjectedEdited(objectId)),
        UpdateElement: (url, body) => dispatch(UpdateElement(url, body)),
        SetObjectToExpand: (ObjectId, url, body) => dispatch(SetObjectToExpand(ObjectId, url, body)),
        SetElementUpdate: () => SetElementUpdate('categories')
    }
}
const ChefCategoryCard = (props) => {
    const { category, EmployeeData,
        SetObjectEdited, DefaultObjectEdited, ObjectToEdit,
        UpdatePending, UpdateId, UpdateError, UpdateElement,
        SetObjectToExpand, CategoryToExpand, SetElementUpdate, ElementUpdate
    } = props
    const [categoryName, setCategoryName] = useState(category.CategoryName)
    const [categoryState, setCategoryState] = useState(category.CategoryState)
    const switchCategoryState = () => {
        if (categoryState === 'IN-SERVICE') {
            setCategoryState('DELETED')
        } else if (categoryState === 'DELETED') {
            setCategoryState('IN-SERVICE')
        }
    }
    useEffect(() => {
        if (categoryName.length < 1) {
            alert('Name Cannot Be Empty')
        }
    }, [categoryName])
    return (
        <div className="chef-category-card">
            {ElementUpdate === 'categories' ?
                <center className="headings">
                    {

                        UpdateError === category.CategoryId ? <h2>Failed</h2>
                            : UpdatePending === category.CategoryId ? <h2>Pending</h2>
                                : UpdateId === category.CategoryId ? <h2>Successful</h2>
                                    : <div></div>

                    }
                </center>
                : <div></div>
            }

            <div className="chef-category-details">
                <div>{category.CategoryId}</div>
                <div>{category.CategoryName}</div>
                <div>{category.TotalDishes}</div>
                <div>{category.CategoryState}</div>
            </div>
            {
                ObjectToEdit === category.CategoryId ?
                    <div className="chef-category-edit">
                        <div className="category-edit-items">
                            <div className="chef-edit-item">Category Name:<br /> <input type="text" onChange={(event) => setCategoryName(event.target.value)} /></div>

                            <div className="chef-edit-item">
                                Category State:<br />
                                <label onClick={() => switchCategoryState()} className="category-state-button">
                                    {categoryState}
                                </label> </div>
                        </div>

                        <div className="category-buttons-section">
                            <div className="chef-category-edit-button button"
                                onClick={() => UpdateElement('http://localhost:8001/categories', {
                                    type: 'categories/update',
                                    Id: category.CategoryId,
                                    CategoryName: categoryName,
                                    CategoryState: categoryState
                                }
                                )}>
                                Update</div>
                            <div className="chef-category-edit-button button" onClick={() => DefaultObjectEdited()}>CANCEL</div>
                        </div>
                    </div>
                    : CategoryToExpand === category.CategoryId ? <ChefFoodList category={category} />
                        :
                        <div className="chef-category-button-grp">
                            <div className="chef-category-edit-button button" onClick={() => {
                                SetElementUpdate('categories')
                                SetObjectEdited(category.CategoryId)
                            }}>EDIT</div>
                            <div className="chef-category-expand-button button" onClick={() => {
                                SetObjectToExpand(
                                category.CategoryId, 'http://localhost:8001/categories', {
                                type: 'menu/read',
                                CategoryId: category.CategoryId,
                                EmployeeData: EmployeeData
                            }
                            )}}>Menu</div>
                        </div>
            }

        </div>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChefCategoryCard)