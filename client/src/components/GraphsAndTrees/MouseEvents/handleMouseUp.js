import { setDraggingObjectId } from '@redux/actions/setDraggingObjectId';
import { draggingOccurs } from '@/redux/actions/draggingOccurs';
import store from '@redux/store';
import { isWithingPerimeter } from '@utils';
import { setOverallState } from '@redux/actions/setOverallState';
import {
  resetCurvePosition,
  calculateCtrlPositions,
} from './MouseEventsStaticFunctions';

const handleMouseUp = (nodeId = -1, isLeft = false, currentLocation) => {
  const state = store.getState().panelState;
  let newState = { ...state };

  newState.draggingObjectId = null;

  //If node Id is not provided we setState and return
  if (nodeId === -1) {
    //return;
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
    // -1 to set a better position
    const h2_3 = 20 - 1;

    //Remove old connection from curve
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
    curve.endPoint.y = targetNode.parentConnectionArea.y - h2_3;
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

  newState.isDragging = false;
  //store.dispatch(draggingOccurs(false));
  store.dispatch(setOverallState(newState));
  //store.dispatch(SetDraggingObjectId(newState.draggingObjectId));
  //store.dispatch(NodesStateReducer({ isLeft, node, curve }));
};

export default handleMouseUp;
