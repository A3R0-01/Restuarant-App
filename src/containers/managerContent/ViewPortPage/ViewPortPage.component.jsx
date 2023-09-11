import { connect } from "react-redux"
import { FetchEmployees } from "../../../ManagerReduxElements/actions"
import EmployeeCardComponent from "./EmployeeCard,component"
import { useEffect, useState } from "react"
import AddStaffComponent from "./AddStaff.component"

const mapStateToProps = ({ ManagerAppData }) => {
    return {
        ManagerData: ManagerAppData.EmployeeData,
        ViewPort: ManagerAppData.ViewPortCat,
        DataPending: ManagerAppData.DataPending,
        DataError: ManagerAppData.DataError,
        EmployeeList: ManagerAppData.DataList,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetData: (body) => dispatch(FetchEmployees(body)),
    }
}
const ViewPortPage = (props) => {
    const { ManagerData, ViewPort, EmployeeList, DataError, DataPending, GetData } = props
    const fetchData = () => {
        GetData({
            type: 'employees/read',
            Position: ViewPort.toUpperCase(),
            EmployeeData: ManagerData
        })
    }
    useEffect(() => {
        fetchData()
    }, [ViewPort])
    return (
        DataError ? <h1 className="text-center text-5xl">ERROR</h1>
            : DataPending ? <h1 className="text-center text-5xl">Pending</h1>
                :
                <div className=" pb-8">
                    <h1 className="text-center text-6xl underline">{ViewPort}</h1>
                    <div className="flex flex-row flex-wrap justify-around w-10/12 m-auto">
                        {
                            EmployeeList.map(employee => <EmployeeCardComponent Refresh={fetchData} Employee={employee} />)

                        }
                        <AddStaffComponent/>
                    </div>
                </div>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPortPage)