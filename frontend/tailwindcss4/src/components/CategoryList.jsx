import PropTypes from "prop-types";
import Category from "./Category";

const CategoryList = ({ menuId, categories }) => {
  return (
    <div className="mt-2">
      <h4 className="font-medium">Categorías:</h4>
      <ul className="ml-4">
        {categories.map((category) => (
          <Category key={category._id} category={category} menuId={menuId} />
        ))}
      </ul>
    </div>
  );
};

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

CategoryList.propTypes = {
  menuId: PropTypes.string.isRequired,
};

export default CategoryList;
