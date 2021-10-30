import { setDraggingObjectId } from '../../../redux/actions/setDraggingObjectId';
import store from '../../../redux/store';

const handleMouseDown = (parentNodeId, isLeft, pointProp) => {
  const state = store.getState().panelState;
  let newState = { ...state };
  newState.draggingObjectId = { parentNodeId, isLeft, pointProp };

  store.dispatch(setDraggingObjectId(newState.draggingObjectId));
};

export default handleMouseDown;
