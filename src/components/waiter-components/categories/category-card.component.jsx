import { connect } from "react-redux";
import { setCategory } from "../../../Waiter redux elements/actions";


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
      ChangeCategory: (IdAndName) => dispatch(setCategory(IdAndName))
  }
}

const CategoryCard = (props) => {
  const {data, ChangeCategory} = props
  const { CategoryName} = data;
  return (
    <button onClick={() => ChangeCategory(data)} className="category-card">
      <div className="category-name">{CategoryName}</div>
    </button>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
