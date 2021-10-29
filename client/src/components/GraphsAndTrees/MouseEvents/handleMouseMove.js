import { SetDraggingObjectId } from '../../../redux/actions/setDraggingObjectId';
import { setOverallState } from '../../../redux/actions/setOverallState';
import store from '../../../redux/store';
import { getStartPoint, getEndAndControlPoint } from '../../../staticFunctions';
import { stateInit, offset, init2 } from '../node/initialNodeData';

const handleMouseMove = ({ clientX, clientY }) => {
  const viewBoxWidth = 1500;
  const viewBoxHeight = 1500;

  const state = store.getState().panelState;
  const { draggingObjectId } = state;
  if (!draggingObjectId) {
    return;
  }

  const svgRect = document.querySelector('#svgRoot').getBoundingClientRect();

  const svgX = clientX - svgRect.left;
  const svgY = clientY - svgRect.top;
  const viewBoxX = (svgX * viewBoxWidth) / svgRect.width;
  const viewBoxY = (svgY * viewBoxHeight) / svgRect.height;

  let newState = { ...state };

  if (draggingObjectId.nodeId != null) {
    const nodeId = draggingObjectId.nodeId;
    const node = newState.nodes[nodeId];
    node.position = { x: viewBoxX, y: viewBoxY };
    node.rightCurve.startPoint = getStartPoint(node.position, node.r, -45);
    node.leftCurve.startPoint = getStartPoint(node.position, node.r, 225);
    if (!node.leftCurve.isConnected) {
      //LeftCurve
      node.leftCurve.endPoint = getEndAndControlPoint(
        node.position,
        node.r,
        225,
        -1,
        1
      );
      node.leftCurve.controlPoint1 = node.leftCurve.startPoint;

      node.leftCurve.controlPoint2 = node.leftCurve.startPoint;
    }
    if (!node.rightCurve.isConnected) {
      node.rightCurve.endPoint = getEndAndControlPoint(
        node.position,
        node.r,
        -45,
        1,
        1
      );
      node.rightCurve.controlPoint1 = node.rightCurve.startPoint;
      node.rightCurve.controlPoint2 = node.rightCurve.startPoint;
    }
    setParentConnectionArea(newState, nodeId);
    store.dispatch(setOverallState(newState));
    return;
  }

  const isLeft = draggingObjectId.isLeft;
  const parentNodeId = draggingObjectId.parentNodeId;

  if (state.draggingObjectId.pointProp === 'startPoint') return;
  else if (state.draggingObjectId.pointProp === 'endPoint') {
    if (isLeft) {
      newState.nodes[parentNodeId].leftCurve.endPoint = {
        x: viewBoxX,
        y: viewBoxY,
      };
      //newState.nodes[parentNodeId].leftCurve.controlPoint1.y = viewBoxY;
      newState.nodes[parentNodeId].leftCurve.controlPoint2.x = viewBoxX;
    } else {
      newState.nodes[parentNodeId].rightCurve.endPoint = {
        x: viewBoxX,
        y: viewBoxY,
      };
      //newState.nodes[parentNodeId].rightCurve.controlPoint1.y = viewBoxY;
      //newState.nodes[parentNodeId].rightCurve.controlPoint2.x = viewBoxX;
    }
  } else if (state.draggingObjectId.pointProp === 'controlPoint1')
    if (isLeft)
      newState.nodes[parentNodeId].leftCurve.controlPoint1 = {
        x: viewBoxX,
        y: viewBoxY,
      };
    else
      newState.nodes[parentNodeId].rightCurve.controlPoint1 = {
        x: viewBoxX,
        y: viewBoxY,
      };
  else if (state.draggingObjectId.pointProp === 'controlPoint2')
    if (isLeft)
      newState.nodes[parentNodeId].leftCurve.controlPoint2 = {
        x: viewBoxX,
        y: viewBoxY,
      };
    else
      newState.nodes[parentNodeId].rightCurve.controlPoint2 = {
        x: viewBoxX,
        y: viewBoxY,
      };

  setParentConnectionArea(newState, parentNodeId);

  store.dispatch(setOverallState(newState));
};

const setParentConnectionArea = (newState, parentNodeId) => {
  newState.nodes[parentNodeId].parentConnectionArea.x =
    newState.nodes[parentNodeId].position.x;
  newState.nodes[parentNodeId].parentConnectionArea.y =
    newState.nodes[parentNodeId].position.y - init2.r + offset;

  return newState;
};

export default handleMouseMove;
