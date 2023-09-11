import { connect } from "react-redux"
import OrdersListComponent from "./OrdersList.component"
import { SetSortBy } from "../../../Chef redux elements/actions"

const mapStateToProps = ({ ChefAppData }) => {
    return {
        EmployeeData: ChefAppData.ChefData,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetSortBy: (number) => dispatch(SetSortBy(number))
    }
}

const ChefOrdersPage = (props) => {
    const { SetSortBy } = props


    return (
        <div className="chef-orders-page p-10 pb-24">
            <h1 className="text-5xl text-center h-1/5">Orders Page</h1>
            <select className=" bg-zinc-700 text-gray-300  mt-3 block text-4xl  w-1/4 capitalize p-0 m-auto" onChange={(event) => SetSortBy(event.target.value)}>
                <option value={4}>ID</option>
                <option value={3}>table id</option>
                <option value={2}>Dishes</option>
                <option value={1}>Cost</option>
                <option value={0}>Status</option>
            </select>

            <OrdersListComponent />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChefOrdersPage)