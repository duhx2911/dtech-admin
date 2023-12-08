import { Staff } from "../../constants";

const staffReducer = (
  state: { staffs: Staff[] } = {
    staffs: [],
  },
  action: { staffs: Staff[]; staff: Staff; id: number; type: string }
) => {
  switch (action.type) {
    case "SAVE_STAFF": {
      return { ...state, staffs: action.staffs || [] };
    }
    case "SAVE_LIST_STAFF": {
      let listStaff = state.staffs;
      if (action.staff) {
        listStaff = [...listStaff, action.staff];
      }
      return {
        ...state,
        staffs: listStaff,
      };
    }
    case "UPDATE_LIST_STAFF": {
      let listStaff = state.staffs;
      let newListStaff;
      if (action.staff) {
        newListStaff = listStaff.map((item: Staff) => {
          if (item.id === action.staff.id) {
            return action.staff;
          }
          return item;
        });
      }

      return {
        ...state,
        staffs: newListStaff,
      };
    }
    case "DELETE_STAFF": {
      let listStaff = state.staffs;
      let newListStaff;
      if (action.id) {
        newListStaff = listStaff.filter(
          (item: Staff) => item.id !== Number(action.id)
        );
      }
      return {
        ...state,
        staffs: newListStaff,
      };
    }
    default:
      return state;
  }
};

export { staffReducer };
