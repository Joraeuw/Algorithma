import { SetDraggingObjectId } from '../../../redux/actions/setDraggingObjectId';
import store from '../../../redux/store';
import NodesStateReducer from '../../../redux/reducers/NodesStateReducer';
import { isWithingPerimeter } from '../../../staticFunctions';
import { setOverallState } from '../../../redux/actions/setOverallState';

const handleMouseUp = (nodeId = -1, isLeft = false, currentLocation) => {
  const state = store.getState().panelState;
  let newState = { ...state };

  newState.draggingObjectId = null;

  //If node Id is not provided we setState and return
  if (nodeId === -1) {
    store.dispatch(SetDraggingObjectId(newState.draggingObjectId));
    return;
  }

  let curve = null;
  if (isLeft) curve = newState.nodes[nodeId].leftCurve;
  else curve = newState.nodes[nodeId].rightCurve;

  const [isWithinPer, node] = isWithingPerimeter(newState, currentLocation);

  if (isWithinPer) {
    curve.endPoint.x = node.parentConnectionArea.x;
    curve.endPoint.y = node.parentConnectionArea.y;
    curve.isConnected = true;

    /*
      if (isLeft) {
        newState.nodes[nodeId].leftCurve = curve;
      } else {
        newState.nodes[nodeId].rightCurve = curve;
      }*/
  } else {
    curve.endPoint.x = curve.startPoint.x + 1;
    curve.endPoint.y = curve.startPoint.y + 1;
  }
  store.dispatch(setOverallState(newState));
  //store.dispatch(SetDraggingObjectId(newState.draggingObjectId));
  //store.dispatch(NodesStateReducer({ isLeft, node, curve }));
};

export default handleMouseUp;
