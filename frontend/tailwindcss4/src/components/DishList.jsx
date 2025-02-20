import PropTypes from "prop-types"; // Importar PropTypes
import Dish from "./Dish";

const DishList = ({ dishes }) => {
  return (
    <ul className="ml-4">
      {dishes.map((dish) => (
        <Dish key={dish._id} dish={dish} />
      ))}
    </ul>
  );
};

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DishList;
