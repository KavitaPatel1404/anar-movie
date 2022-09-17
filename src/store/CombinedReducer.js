import {combineReducers} from 'redux';
import {MoviesReducer} from '../modules/movies';

export default combineReducers({movies: MoviesReducer});
