
import {connect} from 'react-redux'
import { setTableData } from '../../../Waiter redux elements/actions'

const mapStateToProps = (state) =>{
    return {
        TableSelected: state.WaiterAppData.TableSelected
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ChangeTable: (data) => dispatch(setTableData(data))
    }
}
const Table = (props) => {

    const {ClassName, TableSits, TableStatus, TableId, ClassFee} = props.tableData;
    const {ChangeTable, TableSelected} = props
    return(
        <button onClick={ () => ChangeTable(props.tableData)} className="table-container close" key={TableId}>
            <div className="table-number table-details">
                <h2>{TableId}</h2>
            </div>
            <div className = 'table-details'>
                Status: <p className="table-det">{TableStatus}</p>
                Class: {ClassName}
                <p className="table-det">Sits: {TableSits}</p>
                <p className="table-det">Table Fee: {ClassFee}</p>
            </div>
        </button>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Table);