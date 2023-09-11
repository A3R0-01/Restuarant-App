import { useState } from "react"
import { AddingElementToRecords } from "../../../../Chef redux elements/actions"
import { connect } from "react-redux"


const mapStateToProps = ({ChefAppData}) => {
    return{
        EmployeeData: ChefAppData.ChefData,
        CategoryId: ChefAppData.ObjectToExpand
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        AddDishFunc: (body) => dispatch(AddingElementToRecords('http://localhost:8001/categories', body))
    }
}
const AddDish = (props) => {
    const [name, setName] = useState()
    const [descr, setDesc] = useState('n/a')
    const [price, setPrice] = useState(0)
    const {setAdd, EmployeeData, AddDishFunc, CategoryId, refresh} = props

    const finale = () => {
        AddDishFunc({
            EmployeeData: EmployeeData,
            FoodName: name,
            FoodDescription: descr,
            FoodPrice: price,
            CategoryId: CategoryId,
            type: 'menu/create'
        })
        refresh()
    }
    return (
        <center>
            <div>
                Name: <input required type="text" onChange={(event) => setName(event.target.value)}/>
            </div>
            <div>
                Descr: <input required type="textarea" onChange={({target}) => setDesc(target.value)}/>
            </div>
            <div>
                Price: <input required type="number" onChange={({target}) => setPrice(target.value)}/>
            </div>
            <div className="chef-category-button-grp">
                <div className="button" onClick={() => finale()}>done</div>
                <div className="button" onClick={() => setAdd()}>cancel</div>
            </div>
        </center>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDish)