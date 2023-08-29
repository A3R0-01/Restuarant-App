// import { useState, useEffect } from "react";
import './foodCard.styles.css'
import BackSide from './back-side.component'

const FoodCard = (props) => {

    const {menuItem, count} = props
    const { FoodName, FoodDescription, FoodPrice } = menuItem
    return (

        <div className="food-cardContainer inactive" >
            <div className="food-card" >
                <div className="food-side food-front" onClick={() =>  document.querySelectorAll(".food-card")[count-1].classList.toggle("active")}>
                    <div className="img img1"></div>
                    <div clasNames="food-info">
                        <h3 className='food-heading'>{FoodName}: ${FoodPrice}</h3>
                        <p className='food-paragraph'>{FoodDescription}</p>
                    </div>
                </div>
                <div className="food-side food-back">
                    <BackSide menuItem={props.menuItem} count={count}/>
                </div>
            </div>
        </div>
    )

}
export default FoodCard;