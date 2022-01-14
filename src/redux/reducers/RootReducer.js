import NodesStateReducer from './NodesStateReducer';
import PanelZoomMoveReducer from './PanelZoomMoveReducer';
import MediaControlsReducer from './MediaControlsReducer';
import NodeStyleReducer from './NodeStyleReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  panelState: NodesStateReducer,
  viewBox: PanelZoomMoveReducer,
  mediaControls: MediaControlsReducer,
  nodeStyle: NodeStyleReducer,
});

export default rootReducer;
