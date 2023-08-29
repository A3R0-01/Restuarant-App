import { useEffect } from "react";
import {connect} from 'react-redux'
import './body.styles.css';
import TableList from "../../components/waiter-components/table/tableList.component";
import Categories from "../../components/waiter-components/categories/category-list.component";
import FoodList from "../../components/waiter-components/foodList/foodList.component";
import Navigation from "../../components/waiter-components/nav-bar/navigation.component";
import OrdersList from "../../components/waiter-components/ordersComponents/ordersList.component.";
import CustomerPage from "../../components/waiter-components/customer-page/customer-page.component";

const mapStateToProps = (state) => {
    return {
        TableSelected: state.WaiterAppData.TableSelected,
        PageName: state.WaiterAppData.PageName,
        CustomerSelected: state.WaiterAppData.CustomerSelected,
        Category: state.WaiterAppData.Category
    }
}
const mapDispatchToProps = (dispatch) => {
    return{}
}
const WaiterPage = (props) => {

    const { employeeData,
        TableSelected,
        PageName,
        CustomerSelected,
        Category
    } = props

    // useEffect(() => {
    //     fetch('http://localhost:8000/customer', {
    //         method: 'post',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             EmployeeData: employeeData,
    //             type: 'read',
    //             tableId: TableSelected.TableId
    //         })
    //     }).then(response => response.json()).then(data => {
    //         console.log('data', data)
    //         if (data === 'error' || data.length === 0) {
    //             setCustomer('nothing')
    //         } else {
    //             setCustomer(data[0])
    //         }
    //         setPageName('dashboard')
    //     })
    // }, [TableSelected]);

    return (
        <div className={`waiter-app`}>
            <Navigation />
            {(PageName === 'orders') && !(TableSelected === 'nothing') && CustomerSelected!== 'nothing'
                ? <OrdersList data={TableSelected} employeeData={employeeData} customerData={CustomerSelected}/>
                : PageName === 'food' && !(Category === 'nothing') && TableSelected !== 'nothing' && CustomerSelected !== 'nothing'
                    ? <FoodList Category={Category} EmployeeData={employeeData} Customer={CustomerSelected} Table={TableSelected} />
                    : (PageName === 'categories') && !(TableSelected === 'nothing') && (CustomerSelected!== 'nothing')
                        ? <Categories employeeData={employeeData} />
                        : (PageName === 'dashboard') && (TableSelected !== 'nothing')
                            ? <CustomerPage employeeData={employeeData} />
                            : PageName === 'tables' || CustomerSelected === 'nothing'
                                ? <TableList employeeData={employeeData} />
                                : <h1>Someting</h1>

            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(WaiterPage);