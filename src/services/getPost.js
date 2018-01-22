import { get } from '../utils/api';
import * as configuration from '../utils/configuration';
import { Map } from 'immutable';
import * as apiConfig from './apiConfig';

const POST_CONTAIN = 'POST_CONTAIN';

configuration.setConfiguration('API_ROOT', apiConfig.api);
configuration.setConfiguration('AUTH_TOKEN', '');

export const postContain = value => ({ type: POST_CONTAIN, payload: value });

export const getPostbyID = () => {
  return async(dispatch) => {
    get('/posts/1', true).then((responseData) => {
      if (responseData.status === 200) {
        dispatch(postContain(responseData.data));
      } else {
        dispatch(postContain('There is some issue please try after some time'));
      }
    }).catch((e) => {
      dispatch(postContain('There is some issue please try after some time'));
    });
  };
};

export const emptyPost = () => {
  return async(dispatch) => {
    dispatch(postContain('API Response display here'));
  };
};

// Initial state
export const initialState = Map({
  isLoading: false,
  post: 'API Response display here'
}).toJS();

/* eslint-disable */
export default function PostStateReducer(state = initialState, action) {
  switch (action.type) {
    case POST_CONTAIN:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
}


