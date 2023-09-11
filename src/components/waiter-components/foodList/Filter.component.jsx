import { connect } from "react-redux"
import { FetchCategories, SetSortColumn, setCategory } from "../../../Waiter redux elements/actions"
import { useEffect } from "react"

const mapStateToProps = ({ WaiterAppData, CategoriesData }) => {
    return {
        EmployeeData: WaiterAppData.EmployeeData,
        CatPending: CategoriesData.isPending,
        CatError: CategoriesData.error,
        Categories: CategoriesData.Data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetSortColumn: (data) => dispatch(SetSortColumn(data)),
        FetchCategories: (body) => dispatch(FetchCategories(body)),
        SetCategory: (data) => dispatch(setCategory(data))
    }
}
const FilterComponent = (props) => {
    const { SetSortColumn, EmployeeData, FetchCategories,
        Categories, CatError, CatPending, SetCategory
    } = props
    let count = 0
    useEffect(() => {
        FetchCategories({
            type: 'categories/read',
            EmployeeData: EmployeeData
        })
    }, [])
    return (
        <div className="sort-elements">
            <div>
                <label htmlFor="sort-by">Sort By </label>
                <select id="sort-by" onChange={(event) => SetSortColumn(event.target.value)}>
                    <option value={0} key="name">Name</option>
                    <option value={1} key="price">Price</option>
                </select>
            </div>

            {
                CatPending ? <div>Categories: Pending</div>
                    : CatError ? <div>Categories: Error</div>
                        : <div className="categories-opt">
                            Categories:
                            <select onChange={({ target }) => {
                                if(target.value === '0'){
                                    SetCategory({ CategoryId: 0, CategoryName: 'All' })
                                }else{
                                SetCategory(Categories[target.value - 1])}
                                }
                                
                                }>
                                <option value={0}>All</option>
                                {
                                    Categories.map(category => {
                                        count = count+1
                                        return (
                                            <option value={count}>
                                                {category.CategoryName}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent)