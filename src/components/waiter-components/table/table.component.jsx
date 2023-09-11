
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

    const {ClassName, TableSits, TableId, ClassFee} = props.tableData;
    const {ChangeTable, TableSelected} = props
    let color
    if(TableSelected.TableId === TableId) color = 'border-solid border-yellow-400 border-2'
    else color = 'border-solid border-green-600 border-2'
    return(
        <div onClick={ () => ChangeTable(props.tableData)} className={`${color} table-container`} key={TableId}>
            <div className="col-span-1 
            grid place-items-center">
                <h2 className=' bg-slate-800 text-6xl p-3 rounded-2xl'>{TableId}</h2>
            </div>
            <div className = 'col-span-2 table-details'>
               <div className='row-span-2 text-5xl grid place-items-center'>{ClassName}</div>
                <div className="row-span-1 grid grid-flow-col grid-cols-2 gap-2">Sits: <div className='col-span-2'>{TableSits}</div></div>
                <div className="row-span-1 grid grid-flow-col grid-cols-2 gap-2">Fee: <div className='col-span-2'>${ClassFee}</div></div>
            </div>
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Table);