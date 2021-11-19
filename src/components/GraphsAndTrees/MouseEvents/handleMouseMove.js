import { setOverallState } from '@redux/actions/setOverallState';
import store from '@redux/store';
import { getStartPoint, getEndAndControlPoint } from '@/staticFunctions';
import { offset, init2 } from '../node/initialNodeData';

const handleMouseMove = async ({ clientX, clientY }) => {
  const viewBoxWidth = 1500;
  const viewBoxHeight = 1500;

  //Might be improvable by taking draggingObjectId directly and afrter if creating the state
  const draggingObjectId = store.getState().panelState.draggingObjectId;
  if (!draggingObjectId) {
    return;
  }
  const state = store.getState().panelState;

  //Control svg size relative to parent size
  const svgRect = document.querySelector('#svgRoot').getBoundingClientRect();

  const svgX = clientX - svgRect.left;
  const svgY = clientY - svgRect.top;

  //Mouse position
  const viewBoxX = (svgX * viewBoxWidth) / svgRect.width;
  const viewBoxY = (svgY * viewBoxHeight) / svgRect.height;

  let newState = { ...state };
  //Node controls
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

    if (node.parentNodeId) {
      //2/3rds of triangle h
      const z2_3 = 20 - 1;
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
