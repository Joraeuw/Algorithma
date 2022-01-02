import NodesStateReducer from './NodesStateReducer';
import PanelZoomMoveReducer from './PanelZoomMoveReducer';
import MediaControlsReducer from './MediaControlsReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  panelState: NodesStateReducer,
  viewBox: PanelZoomMoveReducer,
  mediaControls: MediaControlsReducer,
});

export default rootReducer;
