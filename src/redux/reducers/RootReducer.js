import NodesStateReducer from './NodesStateReducer';
import ScaleReducer from './ScaleReducer';
import PanelZoomMoveReducer from './PanelZoomMoveReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  panelState: NodesStateReducer,
  scale: ScaleReducer,
  viewBox: PanelZoomMoveReducer,
});

export default rootReducer;
