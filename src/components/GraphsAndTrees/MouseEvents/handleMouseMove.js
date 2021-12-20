import { setOverallState } from '@redux/actions/setOverallState';
import store from '@redux/store';
import { getStartPoint, getEndAndControlPoint } from '@/staticFunctions';
import { calculateParentConnectionArea } from './MouseEventsStaticFunctions';
import { Zoom } from '@/redux/actions/Zoom';

const scale = store.getState().scale;

const handleMouseMove = async ({ clientX, clientY, movementX, movementY }) => {
  //Might be improvable by taking draggingObjectId directly and afrter if creating the state
  const isDragging = store.getState().panelState.isDragging;
  if (!isDragging) {
    return;
  }
  const state = store.getState().panelState;
  const viewBox = store.getState().viewBox;
  const draggingObjectId = state.draggingObjectId;
  //Control svg size relative to parent size
  const svgRect = document.querySelector('#svgRoot').getBoundingClientRect();

  const svgX = clientX - svgRect.left;
  const svgY = clientY - svgRect.top;

  //Mouse position
  const viewBoxX = (svgX * viewBox.width) / svgRect.width + viewBox.x;
  const viewBoxY = (svgY * viewBox.height) / svgRect.height + viewBox.y;

  let newState = { ...state };

  if (isDragging && draggingObjectId === null) {
    viewBox.x -= movementX;
    viewBox.y -= movementY;

    store.dispatch(Zoom(viewBox));
    return;
  }

  if (draggingObjectId.nodeId != null) {
    //Node controls
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

    calculateParentConnectionArea(newState, nodeId);

    if (node.parentNodeId) {
      //2/3rds of triangle h
      const z2_3 = (20 - 1) * scale;
      const parentNode = newState.nodes[node.parentNodeId];

      if (parentNode.leftCurve.childId === nodeId) {
        parentNode.leftCurve.endPoint = {
          x: node.parentConnectionArea.x,
          y: node.parentConnectionArea.y - z2_3,
        };
        //Change the ctrl2 on parent to prevent weird alignment
        parentNode.leftCurve.controlPoint2 = {
          x: parentNode.leftCurve.endPoint.x,
          y: parentNode.leftCurve.controlPoint2.y,
        };
      } else if (parentNode.rightCurve.childId === nodeId) {
        parentNode.rightCurve.endPoint = {
          x: node.parentConnectionArea.x,
          y: node.parentConnectionArea.y - z2_3,
        };
        //Change the ctrl2 on parent to prevent weird alignment
        parentNode.rightCurve.controlPoint2 = {
          x: parentNode.rightCurve.endPoint.x,
          y: parentNode.rightCurve.controlPoint2.y,
        };
      }
      newState.nodes[parentNode.id] = parentNode;
    }

    store.dispatch(setOverallState(newState));
    return;
  }
  //Arrow/Curve controls
  const isLeft = draggingObjectId.isLeft;
  const parentNodeId = draggingObjectId.parentNodeId;
  const parentNode = newState.nodes[parentNodeId];
  //Hanldels endPoint movement
  if (state.draggingObjectId.pointProp === 'startPoint') return;
  else if (state.draggingObjectId.pointProp === 'endPoint') {
    if (isLeft) {
      parentNode.leftCurve.endPoint = {
        x: viewBoxX,
        y: viewBoxY,
      };
      //Determines the position of the ctrl1 and ctrl2 for leftCurve
      parentNode.leftCurve.controlPoint1 = {
        x: parentNode.leftCurve.controlPoint1.x,
        y: viewBoxY,
      };
      parentNode.leftCurve.controlPoint2 = {
        x: viewBoxX,
        y: parentNode.leftCurve.controlPoint2.y,
      };
    } else {
      parentNode.rightCurve.endPoint = {
        x: viewBoxX,
        y: viewBoxY,
      };

      //Determines the position of the ctrl1 and ctrl2 for rightCurve
      parentNode.rightCurve.controlPoint1 = {
        x: parentNode.rightCurve.controlPoint1.x,
        y: viewBoxY,
      };
      parentNode.rightCurve.controlPoint2 = {
        x: viewBoxX,
        y: parentNode.rightCurve.controlPoint2.y,
      };
    }
  } else if (state.draggingObjectId.pointProp === 'controlPoint1')
    if (isLeft)
      parentNode.leftCurve.controlPoint1 = {
        x: viewBoxX,
        y: viewBoxY,
      };
    else
      parentNode.rightCurve.controlPoint1 = {
        x: viewBoxX,
        y: viewBoxY,
      };
  else if (state.draggingObjectId.pointProp === 'controlPoint2')
    if (isLeft)
      parentNode.leftCurve.controlPoint2 = {
        x: viewBoxX,
        y: viewBoxY,
      };
    else
      parentNode.rightCurve.controlPoint2 = {
        x: viewBoxX,
        y: viewBoxY,
      };

  calculateParentConnectionArea(newState, parentNodeId);
  store.dispatch(setOverallState(newState));
};

const handleMouseMoveOnPanel = async ({ clientX, clientY }, xPos, yPos) => {};

export default handleMouseMove;
