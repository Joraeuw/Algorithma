import NodesStateReducer from './NodesStateReducer';
import ScaleReducer from './ScaleReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  panelState: NodesStateReducer,
  scale: ScaleReducer,
});

export default rootReducer;
