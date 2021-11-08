import { setDraggingObjectId } from '@redux/actions/setDraggingObjectId';
import store from '@redux/store';

const handleMouseLeave = () => {
  const state = store.getState().panelState;
  let newState = { ...state };
  newState.draggingObjectId = null;

  store.dispatch(setDraggingObjectId(newState.draggingObjectId));
};

export default handleMouseLeave;
