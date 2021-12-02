import { setDraggingObjectId } from '@redux/actions/setDraggingObjectId';
import { setLastNodeId } from '@/redux/actions/setLastNodeId';
import store from '@redux/store';

const handleMouseDownOnNode = (e, nodeId) => {
  //prevent movement form just right click
  //If posible add context menu on each node
  if (e.nativeEvent.which === 3) {
    console.log(e);
    e.preventDefault();
    return;
  }
  if (e.nativeEvent.which !== 1) return;

  const state = store.getState().panelState;
  let newState = { ...state };
  newState.draggingObjectId = { nodeId };

  store.dispatch(setLastNodeId(nodeId));
  store.dispatch(setDraggingObjectId(newState.draggingObjectId));
};

export default handleMouseDownOnNode;
