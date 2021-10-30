import { setDraggingObjectId } from '../../../redux/actions/setDraggingObjectId';
import store from '../../../redux/store';

const handleMouseDownOnNode = (nodeId) => {
  const state = store.getState().panelState;
  let newState = { ...state };
  newState.draggingObjectId = { nodeId };

  store.dispatch(setDraggingObjectId(newState.draggingObjectId));
};

export default handleMouseDownOnNode;
