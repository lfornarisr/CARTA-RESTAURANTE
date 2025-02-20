import PropTypes from "prop-types";

const Dish = ({ dish }) => {
  return (
    <li key={dish._id}>
      {dish.name} - ${dish.price}
    </li>
  );
};

Dish.propTypes = {
  dish: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Dish;
