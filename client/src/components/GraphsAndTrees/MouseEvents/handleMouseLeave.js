import { setDraggingObjectId } from '@redux/actions/setDraggingObjectId';
import { draggingOccurs } from '@/redux/actions/draggingOccurs';
import store from '@redux/store';

const handleMouseLeave = () => {
  // const state = store.getState().panelState;
  // let newState = { ...state };
  // newState.draggingObjectId = null;

  store.dispatch(draggingOccurs(false));
  store.dispatch(setDraggingObjectId(null));
};

export default handleMouseLeave;
