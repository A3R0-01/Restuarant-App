
const FoodOrder = (props) => {
    const {FoodName, Quantity, FoodOrderId, Specification, Price} = props.foodOrder

    return(
        <div className="food-order">
            <div className="food-order-item food-name">{FoodName}</div>
            <div className="food-order-item food-specification">{Specification}</div>
            <div className="food-order-item food-quantity">{Quantity}</div>
            <div className="food-order-item  food-price">$ {Price}</div>
        </div>
    )
}
export default FoodOrder