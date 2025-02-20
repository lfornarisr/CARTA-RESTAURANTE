import PropTypes from "prop-types";
import DishList from "./DishList";
import Button from "./ui/Button";
import useMenu from "../hooks/useMenu";
import { AddDishForm } from "./AddDishForm";

const Category = ({ category, menuId }) => {
  const { handleDeleteCategory } = useMenu();

  return (
    <li key={category._id}>
      {category.name} ({category.dishes.length} platos)
      {category.dishes.length > 0 && <DishList dishes={category.dishes} />}
      <AddDishForm menuId={menuId} categoryId={category._id} />
      <Button
        onClick={() => handleDeleteCategory(menuId, category._id)}
        className="bg-red-500 max-w-fit hover:bg-red-600 transition-colors"
      >
        Eliminar categoría
      </Button>
    </li>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dishes: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

Category.propTypes = {
  menuId: PropTypes.string.isRequired,
};

export default Category;
