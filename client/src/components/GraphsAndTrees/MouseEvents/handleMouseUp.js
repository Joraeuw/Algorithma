import { setDraggingObjectId } from '../../../redux/actions/setDraggingObjectId';
import store from '../../../redux/store';
import { isWithingPerimeter } from '../../../staticFunctions';
import { setOverallState } from '../../../redux/actions/setOverallState';

const handleMouseUp = (nodeId = -1, isLeft = false, currentLocation) => {
  const state = store.getState().panelState;
  let newState = { ...state };

  newState.draggingObjectId = null;

  //If node Id is not provided we setState and return
  if (nodeId === -1) {
    store.dispatch(setDraggingObjectId(newState.draggingObjectId));
    return;
  }

  let curve = null;
  if (isLeft) curve = newState.nodes[nodeId].leftCurve;
  else curve = newState.nodes[nodeId].rightCurve;

  const [isWithinPerimeter, node] = isWithingPerimeter(
    newState,
    currentLocation
  );

  if (isWithinPerimeter) {
    curve.endPoint.x = node.parentConnectionArea.x;
    curve.endPoint.y = node.parentConnectionArea.y;
    curve.isConnected = true;
    curve.childId = node.id;
    node.parentNodeId = curve.baseId;

    //Determines how the ctrl points should be positioned
    if (isLeft) {
      curve.controlPoint1 = { x: curve.controlPoint1.x, y: curve.endPoint.y };
      curve.controlPoint2 = { x: curve.endPoint.x, y: curve.controlPoint2.y };
    } else {
      curve.controlPoint1 = { x: curve.controlPoint1.x, y: curve.endPoint.y };
      curve.controlPoint2 = { x: curve.endPoint.x, y: curve.controlPoint2.y };
    }
  } else {
    //reset ctrl1 and ctrl2 position
    curve.controlPoint1 = { ...curve.startPoint };
    curve.controlPoint2 = { ...curve.startPoint };
    //determines the position of the endPoint relative to ctrl2
    curve.endPoint.x = isLeft
      ? curve.controlPoint2.x - 1
      : curve.controlPoint2.x + 1;
    curve.endPoint.y = curve.controlPoint2.y + 1;
  }
  store.dispatch(setOverallState(newState));
  //store.dispatch(SetDraggingObjectId(newState.draggingObjectId));
  //store.dispatch(NodesStateReducer({ isLeft, node, curve }));
};

export default handleMouseUp;
