import { init2, offset } from '../node/initialNodeData';

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

const calculateParentConnectionArea = (newState, parentNodeId) => {
  newState.nodes[parentNodeId].parentConnectionArea.x =
    newState.nodes[parentNodeId].position.x;
  newState.nodes[parentNodeId].parentConnectionArea.y =
    newState.nodes[parentNodeId].position.y - init2.r + offset;

  return newState;
};

export {
  resetCurvePosition,
  calculateCtrlPositions,
  calculateParentConnectionArea,
};
