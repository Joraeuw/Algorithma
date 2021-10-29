import { SetDraggingObjectId } from '../../../redux/actions/setDraggingObjectId';
import store from '../../../redux/store';
import { setOverallState } from '../../../redux/actions/setOverallState';

const handleMouseUpOnNode = (node) => {
  const state = store.getState().panelState;
  let newState = { ...state };
  newState.nodes[node.id] = node;
  newState.draggingObjectId = null;

  store.dispatch(setOverallState(newState));
};

export default handleMouseUpOnNode;
