import Constants from '../../Constants';

const {UPDATE_SHORTLISTED_MOVIES} = Constants.REDUX_ACTION_TYPES;

const initalState = {
  shortlisted: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case UPDATE_SHORTLISTED_MOVIES:
      return {...state, shortlisted: action.payload};

    default:
      return state;
  }
}
