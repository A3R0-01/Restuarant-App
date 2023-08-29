import { useEffect, useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return{
        Customer: state.WaiterAppData.CustomerSelected,
        EmployeeData: state.WaiterAppData.EmployeeData,
        Table: state.WaiterAppData.TableSelected
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
    }
}

const BackSide = (props) => {
    const {Table, Customer, menuItem, EmployeeData, count} = props
    const { FoodPrice, FoodName, FoodId, FoodStatus } = menuItem
    const [totalPrice, setTotalPrice] = useState(FoodPrice*1)
    const [quantity, setQuantity] = useState(1)
    const [specification, setSpecification] = useState('N/A')
    const order = () => {
        fetch('http://localhost:8000/order', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                type: 'foodOrder',
                TableId:Table.TableId,
                EmployeeId: EmployeeData.EmployeeId,
                FoodId: FoodId,
                CustomerId:Customer.CustomerId,
                Quantity:quantity,
                Specification: specification,
                Price:totalPrice
            })
        }).then(response => response.json()).then(data => alert(data))
    }


    useEffect(() => {
        setTotalPrice(quantity * FoodPrice)
    }, [quantity, FoodPrice])
    useEffect(()=>{
        if(specification === ''){
            setSpecification('N/A')
        }
    }, [specification])
    return (
        <div className="food-info">
            <h2 className="food-heading">{FoodName}</h2>
            <div class="food-details">
                <h3>Status: {FoodStatus}</h3>
                <p className="food-paragraph">Price: {FoodPrice}</p>
            </div>
            <div className="food-order-details">
                <div className="food-details-to-send">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" id="quantity" placeholder="1" onChange={(event) => setQuantity(event.target.value)} />
                </div>
                <div className="food-details-to-send">
                    <label htmlFor="specification">Specification</label>
                    <input type="textarea" name="specification" id="" onChange={(event) => setSpecification(event.target.value)} />
                </div>
                <center className="food-price">
                    <h3>$  {totalPrice}</h3>
                </center>
            </div>

            <div className="back-btn" onClick={() =>  document.querySelectorAll(".food-card")[count-1].classList.toggle("active")}>
                        <h4 className="food-btn-text">GO BACK</h4>
                        <svg fill="#666" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /><path d="M0-.25h24v24H0z" fill="none" /></svg>
                    </div>

            {
                FoodStatus === 'IN-STOCK'
                    ? <div className="food-btn" onClick={()=> order()}>
                        <h4 className="food-btn-text">MAKE ORDER</h4>
                        <svg fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /><path d="M0-.25h24v24H0z" fill="none" /></svg>
                    </div>
                    :
                    <div className="food-btn">
                        <h4 className="food-btn-text">CANT ORDER</h4>
                        <svg fill="#f90707bc" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /><path d="M0-.25h24v24H0z" fill="none" /></svg>
                    </div>
            }

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)( BackSide);