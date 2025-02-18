import PropTypes from "prop-types"; // Importar PropTypes
import DishList from "./DishList.jsx";

const CategoryList = ({ categories }) => {
  // Recibe categories como prop
  return (
    <div className="mt-2">
      <h4 className="font-medium">Categorías:</h4>
      <ul className="ml-4">
        {categories.map((category) => (
          <li key={category._id}>
            {category.name} ({category.dishes.length} platos)
            {category.dishes.length > 0 && (
              <DishList dishes={category.dishes} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Actualiza los PropTypes para que coincidan
CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dishes: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default CategoryList;
