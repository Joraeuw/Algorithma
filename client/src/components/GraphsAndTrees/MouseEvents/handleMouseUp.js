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

  const [isWithinPerimeter, targetNode] = isWithingPerimeter(
    newState,
    currentLocation
  );

  if (isWithinPerimeter) {
    //2/3rds of triangle h
    const z2_3 = 20 - 1;

    //Remove old connection from curve WORKING
    if (curve.isConnected) {
      newState.nodes[curve.childId].parentNodeId = null;
    }
    //remove old connection from node
    if (targetNode.parentNodeId) {
      const oldParent = newState.nodes[targetNode.parentNodeId];

      //Find if old parent is connected by left cruve (otherwise its right)
      const oldConnectionIsLeft = oldParent.leftCurve.childId === targetNode.id;

      //Reset connection and curve position
      if (oldConnectionIsLeft) {
        oldParent.leftCurve.childId = null;
        oldParent.leftCurve.isConnected = false;
        resetCurvePosition(oldParent.leftCurve, oldConnectionIsLeft);
      } else {
        oldParent.rightCurve.childId = null;
        oldParent.rightCurve.isConnected = false;
        resetCurvePosition(oldParent.rightCurve, oldConnectionIsLeft);
      }

      newState.nodes[oldParent.id] = oldParent;
    }
    curve.endPoint.x = targetNode.parentConnectionArea.x;
    curve.endPoint.y = targetNode.parentConnectionArea.y - z2_3;
    curve.isConnected = true;
    curve.childId = targetNode.id;
    targetNode.parentNodeId = curve.baseId;

    calculateCtrlPositions(curve, isLeft);
  } else {
    //remove parent
    curve.isConnected = false;
    curve.childId = null;

    resetCurvePosition(curve, isLeft);
  }
  store.dispatch(setOverallState(newState));
  //store.dispatch(SetDraggingObjectId(newState.draggingObjectId));
  //store.dispatch(NodesStateReducer({ isLeft, node, curve }));
};

//reset curve position
const resetCurvePosition = (curve, isLeft) => {
  //reset ctrl1 and ctrl2 position
  curve.controlPoint1 = { ...curve.startPoint };
  curve.controlPoint2 = { ...curve.startPoint };
  //determines the position of the endPoint relative to ctrl2
  curve.endPoint.x = isLeft
    ? curve.controlPoint2.x - 1
    : curve.controlPoint2.x + 1;
  curve.endPoint.y = curve.controlPoint2.y + 1;
};

//Determines how the ctrl points should be positioned
const calculateCtrlPositions = (curve, isLeft) => {
  if (isLeft) {
    curve.controlPoint1 = { x: curve.controlPoint1.x, y: curve.endPoint.y };
    curve.controlPoint2 = { x: curve.endPoint.x, y: curve.controlPoint2.y };
  } else {
    curve.controlPoint1 = { x: curve.controlPoint1.x, y: curve.endPoint.y };
    curve.controlPoint2 = { x: curve.endPoint.x, y: curve.controlPoint2.y };
  }
};

export default handleMouseUp;
