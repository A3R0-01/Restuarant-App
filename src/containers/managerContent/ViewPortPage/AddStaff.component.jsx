import { connect } from "react-redux"
import { useState } from "react"
import { HireStaff } from "../../../ManagerReduxElements/actions"
const mapStateToProps = ({ ManagerAppData }) => {
    return {
        ManagerData: ManagerAppData.EmployeeData,
        ViewPortCat: ManagerAppData.ViewPortCat,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        HireStaff: (body) => dispatch(HireStaff(body))
    }
}
const AddStaff = (props) => {
    const {HireStaff, ManagerDatam, ViewPortCat} = props
    const [firstName, SetFirstName] = useState(null)
    const [surname, SetSurname] = useState(null)
    const [passWord, SetPassWord] = useState(null)
    const [salary, SetSalary] = useState(null)
    const [address, SetAddress] = useState(null)
    const [email, SetEmail] = useState(null)
    const [natId, SetId] = useState(null)
    const [addStaff, SetAddStaff] = useState(false)
    const positionFunc = () => {
        switch(ViewPortCat){
            case 'waiter':
                return 2
            case 'manager':
                return 0
            case 'chef':
                return 1
            default:
                return 2
        }
    }
    const finishHire = () => HireStaff({
        type: 'employees/addStaff',
        EmployeePassword: passWord, 
        FirstName: firstName, 
        Surname: surname, 
        Salary: salary, 
        Address: address, 
        Email: email, 
        NatId: natId, 
        Position: positionFunc()
    })
    if (addStaff){
        return (<div className="addStaff-container border-t-2 border-white border-solid p-12 grid grid-flow-row gap-x-2 m-9 input-fields text-3xl xl:w-2/5 lg:w-2/5 sm:w-full md:w-2/3">
            <div className="grid grid-cols-3 ">
                Surname:
                <input required onChange={({ target }) => SetSurname(target.value)} className=" w-10" type="text" />
            </div>
            <div className=" grid grid-cols-3">
                First Name
                <input required onChange={({ target }) => SetFirstName(target.value)} className=" w-32" type="text" />
            </div>
            <div className=" grid grid-cols-3">
                Password: <input required onChange={({ target }) => SetPassWord(target.value)} className=" col-span-2" type="text" />
            </div>
            <div className=" grid grid-cols-3">
                Address: <input required onChange={({ target }) => SetAddress(target.value)} className=" col-span-2" type="text" />
            </div>
            <div className=" grid grid-cols-3">
                Email:
                <input className=" col-span-2" required onChange={({ target }) => SetEmail(target.value)} type="email" />
            </div>

            <div className=" grid grid-cols-3">
                Nat Id:
                <input className=" col-span-2" required onChange={({ target }) => SetId(target.value)} type="text" />
            </div>
            
            <div className=" grid grid-cols-3">
                Salary:$ <input className=" col-span-2" required onChange={({ target }) => SetSalary(target.value)} type="number" />
            </div>
            <div className=" uppercase grid gap-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-col-4 lg:grid-cols-4 w-full ">
                <div className="col-span-1 xl:col-start-2 p-2 cursor-pointer h-fit grid place-items-center hover:shadow-md hover:shadow-green-500 text-green-400 border-2 border-green-500" onClick={() => finishHire()}>Done</div>
                <div className="p-2 cursor-pointer col-span-2 xl:col-start-3 h-fit grid place-items-center hover:shadow-md hover:shadow-red-500 text-red-400 border-2 border-red-500" onClick={() => SetAddStaff(!addStaff)}>Cancel</div>
            </div>

        </div>)
        }
    else {
        return (
            <div className=" text-7xl text-green-500 border-2 border-solid border-green-500 w-96 text-center uppercase m-auto p-2 hover:shadow-xl hover:shadow-green-600 cursor-pointer h-96 xl:w-2/5 grid place-items-center"
            onClick={() => SetAddStaff(!addStaff)}
            >
                Add
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff)