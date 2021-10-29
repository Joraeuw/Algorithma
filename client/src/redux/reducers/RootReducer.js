import NodesStateReducer from './NodesStateReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  panelState: NodesStateReducer,
});

export default rootReducer;
