import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { UpdateEmployeesRecords } from "../../../ManagerReduxElements/actions"


const mapStateToProps = ({ManagerAppData}) => {
    return{
        ManagerData: ManagerAppData.EmployeeData,
        Error: ManagerAppData.UpdateError,
        Pending: ManagerAppData.UpdatePending,
        Success: ManagerAppData.UpdateSuccess,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        UpdateElement: (body) => dispatch(UpdateEmployeesRecords(body))
    }
}
const EmployeeCard = (props) => {
    const {Employee, ManagerData, UpdateElement, Error, Pending, Success, Refresh} = props
    const {EmployeeId, EmployeePassword, FirstName, Surname, Salary, Address, Email, NatId, DateLeft } = Employee
    const [firstName, SetFirstName] = useState(FirstName)
    const [surname, SetSurname] = useState(Surname)
    const [passWord, SetPassWord] = useState(EmployeePassword)
    const [salary, SetSalary] = useState(Salary)
    const [address, SetAddress] = useState(Address)
    const [email, SetEmail] = useState(Email)
    const [natId, SetId] = useState(NatId)
    const [edit, SetEdit] = useState(false)
    let color
    switch (EmployeeId) {
        case Error:
            color = 'shadow-red-600 shadow-md'
            break;
        case Pending:
            color = 'shadow-yellow-300 shadow-md'
            break;
        case Success:
            color = 'shadow-green-500 shadow-md'
            break;
        default:
            color = 'border-t-2 border-solid'
            break;
    }
    const DoneUpdate = () => {
        UpdateElement({
            EmployeeId: EmployeeId, 
            EmployeePassword: passWord, 
            FirstName: firstName, 
            Surname: surname,
            Salary: salary,
            Address: address, 
            Email: email, 
            NatId: natId,
            type: 'employees/update',
            EmployeeData: ManagerData
        })
        Refresh()
    }
    const statusFunction = (status) => {
        UpdateElement({
            EmployeeId: EmployeeId,
            Status: status,
            type: 'employees/status'
        })
        Refresh()
    }
    useEffect(() => {
        if(!firstName) SetFirstName(FirstName)
        else if(!surname) SetSurname(Surname)
        else if(!passWord) SetPassWord(EmployeePassword)
        else if(!salary) SetSalary(Salary)
        else if(!address) SetAddress(Address)
        else if(!email) SetEmail(Email)
        else if(!natId) SetId(NatId)
        SetEdit(!(firstName === FirstName &&
                surname === Surname &&
                passWord === EmployeePassword &&
                Salary === salary &&
                address === Address &&
                email === Email &&
                natId === NatId)
                )
    }, [firstName, surname, passWord, salary, address, email, natId])

    console.log(edit)
    return(
        <div className={` ${color} text-3xl grid grid-rows-6 gap-y-4 m-9 xl:w-2/5`}>
            <div className=" row-span-5 grid grid-cols-4">
                <div className=" grid place-items-center col-span-1 text-6xl">{EmployeeId}</div>
                <div className=" p-12 col-span-3 grid  gap-y-2 input-fields">
                    <div className="text-4xl mb-7 grid grid-cols-3 ">
                        <input required onChange={({target}) => SetSurname(target.value)} className=" w-10" type="text" defaultValue={Surname} />
                        <input required onChange={({target}) => SetFirstName(target.value)} className=" w-32" type="text" defaultValue={FirstName} />
                    </div>
                    <div className=" grid grid-cols-3">
                    Password: <input required onChange={({target}) => SetPassWord(target.value)} className=" col-span-2" type="text" defaultValue={EmployeePassword} />
                    </div>
                    <div className=" grid grid-cols-3">
                    Address: <input required onChange={({target}) => SetAddress(target.value)} className=" col-span-2" type="text" defaultValue={Address} />
                    </div>
                    <div className=" grid grid-cols-3">
                        Email:
                        <input className=" col-span-2" required onChange={({target}) => SetEmail(target.value)} type="email" defaultValue={Email} />
                    </div>
                    
                    <div className=" grid grid-cols-3">
                        Nat Id:
                        <input className=" col-span-2" required onChange={({target}) => SetId(target.value)} type="text" defaultValue={NatId} />
                    </div>
                    
                    <div className=" grid grid-cols-3">
                    Salary:$ <input  className=" col-span-2"required onChange={({target}) => SetSalary(target.value)} type="number" defaultValue={Salary} />
                    </div>
                </div>
            </div>
            <div className="row-span-1 grid grid-cols-4 gap-4 p-6 uppercase">
                {
                    edit? <div className="p-2 cursor-pointer col-start-2 col-span-1 h-full grid place-items-center hover:shadow-md hover:shadow-green-500 text-green-300 border-2 border-green-500"
                    
                    onClick={() => DoneUpdate()}
                    >Done</div>
                    :null
                }
                {
                    DateLeft?
                    <div className=" col-start-3 p-2 cursor-pointer col-span-2 h-full grid place-items-center hover:shadow-md hover:shadow-green-500 text-green-400 border-2 border-green-500"
                    onClick={() => statusFunction(0)}
                    >reinstate</div>
                    :
                    <div className=" col-start-3 p-2 cursor-pointer col-span-2 h-full grid place-items-center hover:shadow-md hover:shadow-red-500 text-red-400 border-2 border-red-500" 
                    onClick={() => statusFunction(1)}
                    >terminate</div>
                }
                
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCard)