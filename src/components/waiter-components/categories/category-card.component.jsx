import { connect } from "react-redux";
import { setCategory } from "../../../Waiter redux elements/actions";


const mapStateToProps = ({WaiterAppData}) => {
  return {
    Category: WaiterAppData.Category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      ChangeCategory: (IdAndName) => dispatch(setCategory(IdAndName))
  }
}

const CategoryCard = (props) => {
  const {data, ChangeCategory, Category} = props
  const { CategoryName, InStock, CategoryId} = data;
  let color
  if(Category.CategoryId === CategoryId && InStock){
    color = 'border-yellow-500 hover:shadow-yellow'
  }else if(InStock){
    color = 'border-green-500 hover:shadow-md hover:shadow-green-600'
  }else{
    color = 'border-red-500 hover:shadow-red-600'
  }
  return (
    <div onClick={() => ChangeCategory(data)} className={`${color} category-card `}>
      <div className="category-name ">{CategoryName}</div>
      <div className="category-det">{InStock}</div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
