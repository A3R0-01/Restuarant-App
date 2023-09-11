import { useEffect } from 'react'
import Table from './table.component'
import { connect } from 'react-redux'
import { RequestData } from '../../../Waiter redux elements/actions'

const mapStateToProps = (state) => {
    return {
        TableList: state.RequestData.dataRequested,
        isPending: state.RequestData.isPending,
        error: state.RequestData.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        RequestTableData: (url, body) => dispatch(RequestData(url, body))
    }
}

const TableList = (props) => {
    const { TableList, isPending } = props
    useEffect(() => {
        props.RequestTableData('http://localhost:8000/tables', {
            type: 'read',
            // verificationData: employeeData
        })
    }, [])

    return isPending ?
        <h1>Loading</h1> :
        (
            <center className='table-list'>
                {TableList.map((table) => {
                    return <Table tableData={table} />
                })}
            </center>

        )
}
export default connect(mapStateToProps, mapDispatchToProps)(TableList)