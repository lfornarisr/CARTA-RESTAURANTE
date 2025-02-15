import PropTypes from "prop-types"; // Importar PropTypes

const DishList = ({ dishes }) => {
  return (
    <ul className="ml-4">
      {dishes.map((dish) => (
        <li key={dish._id}>
          {dish.name} - ${dish.price}
        </li>
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
