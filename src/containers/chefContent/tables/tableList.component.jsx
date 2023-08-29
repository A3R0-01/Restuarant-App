import { connect } from "react-redux"
import Table from "./table.component"
import { RequestData } from "../../../Waiter redux elements/actions"
import { useEffect, useState } from "react"
import './chef-tables.styles.css'
import { AddingElementDefault, AddingElementToRecords, GetTableClasses } from "../../../Chef redux elements/actions"

const mapStateToProps = (state) => {
    return {
        Tables: state.RequestData.dataRequested,
        ChefData: state.ChefAppData.ChefData,
        AddElementResponse: state.ChefAppData.CreateElementResponse,
        AddElementError: state.ChefAppData.CreateElementError,
        AddElementPending: state.ChefAppData.CreateElementPending,
        TableClasses: state.ChefAppData.TableClasses,
        ClassesPending: state.ChefAppData.ClassesPending,
        ClassesError: state.ChefAppData.ClassesError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetTableList: (url, body) => dispatch(RequestData(url, body)),
        GetTableClasses: (body) => dispatch(GetTableClasses(body)),
        SetElementDefault: () => dispatch(AddingElementDefault()),
        AddElementToRecords: (url, body) => dispatch(AddingElementToRecords(url, body))
    }
}
const TableList = (props) => {
    const {
        Tables,
        GetTableList,
        ChefData,
        AddElementResponse,
        AddElementError,
        AddElementPending,
        GetTableClasses,
        SetElementDefault,
        TableClasses,
        ClassesPending,
        ClassesError,
        AddElementToRecords
    } = props
    const [addElement, setAddElement] = useState(false)
    const [tableClass, setTableClass] = useState(0)
    const [tableSits, setTableSits] = useState(2)

    const getTablesFunction = () => GetTableList('http://localhost:8001/tables', {
        type: 'tables/read',
        VerificationData: ChefData
    })
    useEffect(() => {
        if (addElement) {
            GetTableClasses({ type: 'classes/read', EmployeeData: ChefData })
        } else {
            SetElementDefault()
        }
    }, [addElement])
    useEffect(() => {
        if (tableSits < 1) {
            setTableSits(2)
        }
    }, [tableSits])
    useEffect(() => {
        getTablesFunction()
    }, [])
    return (
        <center className="chef-table-list">
            <div className="tables-message">
                {
                    AddElementPending ? <h3>Pending</h3>
                        : AddElementError ? <h3>An Error Occurred</h3>
                            : AddElementResponse === 'AddTable/SUCCESSFUL' ? <h3>Table Added</h3>
                                : AddElementResponse === 'DeleteTable/UNSUCCESSFUL' ? <h3>Failed To Delete Table</h3>
                                    : AddElementResponse === 'DeleteTable/SUCCESSFUL' ? <h3>Table Deleted</h3>
                                        : AddElementResponse === 'AddTable/UNSUCCESSFUL' ? <h3> Failed To Add</h3>
                                            : <br />
                }
            </div>
            <center>
                <h2 className="refresh-button" onClick={() => getTablesFunction()}>REFRESH</h2>
            </center>
            <div className="chef-table-headings chef-table">
                <div>Id</div>
                <div>Class</div>
                <div>Sits</div>
                <div>Edit</div>
            </div>
            {Tables.map(table => {
                return <Table data={table} />
            })}
            {
                addElement ?
                    <div className="add-element-container">
                        <div className="table-edit-component chef-table inner">
                            <div className="chef-table-edit chef-table-items">AUTO </div>
                            {
                                ClassesPending ? <div>Loading</div>
                                    : ClassesError ? <div>Error Classes</div>
                                        : TableClasses.length < 1 ? <div>Please Add Classes</div>
                                            :
                                            <select className="chef-table-edit chef-table-items" onChange={(event) => setTableClass(event.target.value)}>
                                                <option value="" key="">Select Class</option>
                                                {TableClasses.map(tableClass => <option value={`${tableClass.ClassId}`}>{tableClass.ClassName}</option>)}
                                            </select>
                            }

                            <input onChange={(event) => setTableSits(event.target.value)} type="number" className="chef-table-edit chef-table-items" />
                            <div className="chef-table-items edit-button done-button" onClick={() => AddElementToRecords('http://localhost:8001/tables', {
                                type: 'tables/create',
                                TableClass: tableClass,
                                TableSits: tableSits,
                                EmployeeData: ChefData
                            })}>Add Table</div>
                        </div>
                        <div className="cancel-add-table-btn" onClick={() => setAddElement(!addElement)}>cancel</div>
                    </div>
                    : <div className="add-table-btn" onClick={() => setAddElement(!addElement)}>ADD</div>

            }
            <div>

            </div>
        </center>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList)
