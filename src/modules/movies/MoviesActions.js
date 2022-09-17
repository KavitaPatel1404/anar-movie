import Constants from '../../Constants';

const {UPDATE_SHORTLISTED_MOVIES} = Constants.REDUX_ACTION_TYPES;

export function updateShortlistedMovies(data) {
  return (dispatch, getState) => {
    try {
      const {
        movies: {shortlisted},
      } = getState();

      console.log(
        'shortlisted.find(m => m.imdbID === data.imdbID): ',
        shortlisted.find(m => m.imdbID === data.imdbID),
      );
      if (shortlisted.find(m => m.imdbID === data.imdbID)) {
        dispatch({
          type: UPDATE_SHORTLISTED_MOVIES,
          payload: shortlisted.filter(m => m.imdbID !== data.imdbID),
        });
      } else {
        dispatch({
          type: UPDATE_SHORTLISTED_MOVIES,
          payload: [...shortlisted, data],
        });
      }
    } catch (err) {
      console.log('updateMoviesErr', err);
    }
  };
}
