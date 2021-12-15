import store from '@redux/store';
import { setOverallState } from '@redux/actions/setOverallState';
import { draggingOccurs } from '@/redux/actions/draggingOccurs';

const handleMouseUpOnNode = (node) => {
  const state = store.getState().panelState;
  let newState = { ...state };
  newState.nodes[node.id] = node;
  newState.draggingObjectId = null;
  newState.isDragging = false;
  //store.dispatch(draggingOccurs(false));
  store.dispatch(setOverallState(newState));
};

export default handleMouseUpOnNode;
