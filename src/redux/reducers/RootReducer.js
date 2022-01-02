import NodesStateReducer from './NodesStateReducer';
import ScaleReducer from './ScaleReducer';
import PanelZoomMoveReducer from './PanelZoomMoveReducer';
import MediaControlsReducer from './MediaControlsReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  panelState: NodesStateReducer,
  scale: ScaleReducer,
  viewBox: PanelZoomMoveReducer,
  mediaControls: MediaControlsReducer,
});

export default rootReducer;
