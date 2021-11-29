import { setDraggingObjectId } from '@redux/actions/setDraggingObjectId';
import { setLastNodeId } from '@/redux/actions/setLastNodeId';
import store from '@redux/store';

const handleMouseDown = (e, parentNodeId, isLeft, pointProp) => {
  //prevent movement form just right click
  if (e.nativeEvent.which === 3) return;

  const state = store.getState().panelState;
  let newState = { ...state };
  newState.draggingObjectId = { parentNodeId, isLeft, pointProp };

  store.dispatch(setLastNodeId(parentNodeId));
  store.dispatch(setDraggingObjectId(newState.draggingObjectId));
};

export default handleMouseDown;
