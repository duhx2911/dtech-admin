import { Categories } from "../../constants";

const categoryReducer = (
  state: { categories: Categories[] } = {
    categories: [],
  },
  action: {
    categories: Categories[];
    category: Categories;
    id: number;
    type: string;
  }
) => {
  switch (action.type) {
    case "SAVE_CATEGORIES": {
      return {
        ...state,
        categories: action.categories || [],
      };
    }
    case "SAVE_LIST_CATEGORIES": {
      let listCategories = state.categories;
      if (action.category) {
        listCategories = [...listCategories, action.category];
      }
      return {
        ...state,
        categories: listCategories,
      };
    }
    case "UPDATE_LIST_CATEGORIES": {
      let listCategories = state.categories;
      let newListCategory;
      if (action.category) {
        newListCategory = listCategories.map((item: Categories) => {
          if (item.id === action.category.id) {
            return action.category;
          }
          return item;
        });
      }
      return {
        state,
        categories: newListCategory,
      };
    }
    case "DELETE_CATEGORY": {
      let listCategories = state.categories;
      let newListCategory;
      if (action.id) {
        newListCategory = listCategories.filter(
          (item: Categories) => item.id !== Number(action.id)
        );
      }
      return {
        ...state,
        categories: newListCategory,
      };
    }
    default:
      return state;
  }
};
export { categoryReducer };
