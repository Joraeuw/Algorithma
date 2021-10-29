import { SetDraggingObjectId } from '../../../redux/actions/setDraggingObjectId';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../redux/store';

const handleMouseUpOnNode = (node) => {
  const state = store.getState().panelState;
  let newState = { ...state };
  newState.draggingObjectId = null;

  store.dispatch(SetDraggingObjectId(newState.draggingObjectId));
};

export { handleMouseUpOnNode };
