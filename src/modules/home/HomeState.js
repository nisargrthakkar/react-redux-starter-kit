import {Map} from 'immutable';

export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';

export const increment = () => {
    return dispatch => {
        dispatch({
            type: INCREMENT
        });
    };
};

export const decrement = () => {
    return dispatch => {
        dispatch({
            type: DECREMENT
        });
    };
};

const initialState = Map({count: 0}).toJS();

export default function HomeStateReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1
            };

        default:
            return state;
    }
};





