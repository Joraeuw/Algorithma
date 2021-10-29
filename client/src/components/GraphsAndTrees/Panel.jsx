import { useState } from 'react';
import BezierCurve from './node/BezierCurve';
import { handleMouseUpOnNode } from './MouseEvents/handleMouseUpOnNode';
import Node from './node/Node';
import {
  getStartPoint,
  getEndAndControlPoint,
  isWithingPerimeter,
} from '../../staticFunctions';
import { stateInit, offset, init2 } from './node/initialNodeData';

const Panel = (props) => {
  const [state, setState] = useState(stateInit);
  const viewBoxWidth = 1500;
  const viewBoxHeight = 1500;
  const handleMouseDown = (parentNodeId, isLeft, pointProp) => {
    setState({
      ...state,
      draggingObjectId: { parentNodeId, isLeft, pointProp },
    });
  };
  const handleMouseUp = (nodeId = -1, isLeft = false, currentLocation) => {
    const newState = { ...state };
    newState.draggingObjectId = null;

    //If node Id is not provided we setState and return
    if (nodeId === -1) {
      setState(newState);
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
    setState(newState);
  };
  const handleMouseLeave = () => {
    setState({ ...state, draggingObjectId: null });
  };

  const handleMouseMove = ({ clientX, clientY }) => {
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
      setState(newState);
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

    setState(newState);
  };

  const setParentConnectionArea = (newState, parentNodeId) => {
    newState.nodes[parentNodeId].parentConnectionArea.x =
      newState.nodes[parentNodeId].position.x;
    newState.nodes[parentNodeId].parentConnectionArea.y =
      newState.nodes[parentNodeId].position.y - init2.r + offset;

    return newState;
  };
  const handleMouseDownOnNode = (nodeId) => {
    setState({
      ...state,
      draggingObjectId: { nodeId },
    });
  };

  const nodes = state.nodes.map((node) => (
    <Node
      key={node.id.toString()}
      handleMouseDownOnNode={() => handleMouseDownOnNode(node.id)}
      handleMouseUpOnNode={handleMouseUpOnNode}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      nodeData={node}
    />
  ));

  return (
    <svg
      id="svgRoot"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      onMouseMove={(ev) => handleMouseMove(ev)}
      onMouseLeave={() => handleMouseLeave()}
    >
      {nodes}
    </svg>
  );
};

export default Panel;
