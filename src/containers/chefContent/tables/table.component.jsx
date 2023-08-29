import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { AddingElementToRecords, DefaultObjectEdited, SetObjectedEdited, UpdateElement } from "../../../Chef redux elements/actions"
const mapStateToProps = (state) => {
    return {
        TableClasses: state.ChefAppData.TableClasses,
        ClassesPending: state.ChefAppData.ClassesPending,
        ClassesError: state.ChefAppData.ClassesError,
        ChefData: state.ChefAppData.ChefData,
        ObjectEditedId: state.ChefAppData.ObjectEditedId,
        UpdateId: state.ChefAppData.UpdateId,
        UpdateError: state.ChefAppData.UpdateError,
        UpdatePending: state.ChefAppData.UpdatePending

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        SetObjectEdited: (objectId, body) => dispatch(SetObjectedEdited(objectId, body)),
        UpdateElement: (url, body) => dispatch(UpdateElement(url, body)),
        AddElementToRecords: (url, body) => dispatch(AddingElementToRecords(url, body)),
        DefaultObjectEdited: () => dispatch(DefaultObjectEdited())

    }
}
const Table = (props) => {
    const { data, TableClasses,
        ClassesPending, ClassesError,
        SetObjectEdited,
        ChefData, ObjectEditedId, DefaultObjectEdited,
        UpdateId, UpdateError, UpdatePending,
        AddElementToRecords,
        UpdateElement } = props
    const [tableClass, setTableClass] = useState(data.ClassId)
    const [tableSits, setTableSits] = useState(data.TableSits)

    useEffect(() => {
        if (tableSits < 1) {
            setTableSits(2)
        }
    }, [tableSits, tableClass])

    return (
        <div className="chef-table-container">

            <center>
                {
                    UpdateError === data.TableId ? <h3>error during update</h3>
                        : UpdatePending === data.TableId ? <h3>Pending update</h3>
                            : UpdateId === data.TableId ? <h3>update complete</h3>
                                : <br />
                }
            </center>

            <div className="chef-table inner">
                <div className="chef-table-items">{data.TableId}</div>
                <div className="chef-table-items">{data.ClassName}</div>
                <div className="chef-table-items">{data.TableSits}</div>
                <div className="chef-table-items edit-section">
                    <div className="tables-edit-button " onClick={() => SetObjectEdited(data.TableId, { type: 'classes/read', EmployeeData: ChefData })}>EDIT</div>
                    <div className="tables-red-btn" onClick={() => AddElementToRecords('http://localhost:8001/tables', {
                        type: 'tables/delete',
                        EmployeeData: ChefData,
                        TableId: data.TableId
                    })}>
                        Delete
                    </div>
                </div>


            </div>
            {
                ObjectEditedId === data.TableId && !ClassesPending ?
                    <div className="table-edit-component chef-table inner">
                        <div className="chef-table-edit chef-table-items">{data.TableId} </div>
                        {
                            ClassesPending ? <div>Loading</div>
                                : ClassesError ? <div>Error Classes</div>
                                    : TableClasses.length < 1 ? <div>Please Add Classes</div>
                                        :
                                        <select className="chef-table-edit chef-table-items" onChange={(event) => setTableClass(event.target.value)}>
                                            {TableClasses.map(tableClass => <option value={`${tableClass.ClassId}`}>{tableClass.ClassName}</option>)}
                                        </select>
                        }
                        <input onChange={(event) => setTableSits(event.target.value)} type="number" className="chef-table-edit chef-table-items" />
                <div className="chef-table-items edit-section">

                        <div className="edit-button done-button" onClick={() => {
                            UpdateElement('http://localhost:8001/tables', {
                                type: 'tables/update',
                                TableClass: tableClass,
                                TableSits: tableSits,
                                Id: data.TableId
                            })
                            DefaultObjectEdited()

                        }
                        }>UPDATE</div>
                        <div className="table-red-btn" onClick={() => DefaultObjectEdited()}>Cancel</div>
                    </div>
                    </div> : <br />
            }

        </div>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)