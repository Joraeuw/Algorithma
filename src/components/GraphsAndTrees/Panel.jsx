import { useState } from 'react';
import BezierCurve from './node/BezierCurve';
import Node from './node/Node';
import { getStartPoint } from '../../staticFunctions';

const Panel = (props) => {
  const initR = 10;
  const offset = 0;
  const init = { id: 0, r: 50, position: { x: 100, y: 100 } };
  const startInitR = getStartPoint(init.position, init.r, -45);
  const startInitL = getStartPoint(init.position, init.r, 225);

  const init2 = { id: 1, r: 50, position: { x: 300, y: 300 } };
  const startInitR2 = getStartPoint(init2.position, init2.r, -45);
  const startInitL2 = getStartPoint(init2.position, init2.r, 225);
  const stateInit = {
    nodes: [
      {
        id: init.id,
        r: init.r,
        position: init.position,
        value: 'node0',
        rightCurve: {
          id: 0,
          childId: 1,
          isConnected: false,
          startPoint: startInitR,
          controlPoint1: startInitR,
          controlPoint2: startInitR,
          endPoint: startInitR,
        },
        leftCurve: {
          id: 1,
          child: 'node2',
          isConnected: false,
          startPoint: startInitL,
          controlPoint1: startInitL,
          controlPoint2: startInitL,
          endPoint: startInitL,
        },

        parentConnectionLocation: {
          r: initR,
          x: init.position.x,
          y: init.position.y - init.r + offset,
        },
      },
      {
        id: 1,
        r: init2.r,
        position: { x: 300, y: 300 },
        value: 'node1',
        rightCurve: {
          id: 0,
          childId: null,
          isConnected: false,
          startPoint: startInitR2,
          controlPoint1: startInitR2,
          controlPoint2: startInitR2,
          endPoint: startInitR2,
        },
        leftCurve: {
          id: 1,
          child: 'node2',
          isConnected: false,
          startPoint: startInitL2,
          controlPoint1: startInitL2,
          controlPoint2: startInitL2,
          endPoint: startInitL2,
        },

        parentConnectionLocation: {
          r: initR,
          x: init2.position.x,
          y: init2.position.y - init2.r + offset,
        },
      },
    ],
    draggingObjectId: null,
  };

  const [state, setState] = useState(stateInit);
  const viewBoxWidth = 1500;
  const viewBoxHeight = 1500;
  const handleMouseDown = (parentNodeId, isLeft, pointProp) => {
    setState({
      ...state,
      draggingObjectId: { parentNodeId, isLeft, pointProp },
    });
  };

  const handleMouseUp = (nodeId = 0, isLeft = false) => {
    const newState = { ...state };
    newState.draggingObjectId = null;

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
      newState.nodes[nodeId].position = { x: viewBoxX, y: viewBoxY };
      newState.nodes[nodeId].rightCurve.startPoint = getStartPoint(
        state.nodes[nodeId].position,
        state.nodes[nodeId].r,
        -45
      );
      newState.nodes[nodeId].leftCurve.startPoint = getStartPoint(
        state.nodes[nodeId].position,
        state.nodes[nodeId].r,
        225
      );
      setParentConnectionLocation(newState, nodeId);
      setState(newState);
      return;
    }

    const isLeft = draggingObjectId.isLeft;
    const parentNodeId = draggingObjectId.parentNodeId;

    if (state.draggingObjectId.pointProp === 'startPoint') return;
    /* if (isLeft)
        newState.nodes[parentNodeId].leftCurve = { x: viewBoxX, y: viewBoxY };
      else
        newState.nodes[parentNodeId].rightCurve = { x: viewBoxX, y: viewBoxY };*/ else if (
      state.draggingObjectId.pointProp === 'endPoint'
    )
      if (isLeft)
        newState.nodes[parentNodeId].leftCurve.endPoint = {
          x: viewBoxX,
          y: viewBoxY,
        };
      else
        newState.nodes[parentNodeId].rightCurve.endPoint = {
          x: viewBoxX,
          y: viewBoxY,
        };
    else if (state.draggingObjectId.pointProp === 'controlPoint1')
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

    setParentConnectionLocation(newState, parentNodeId);
    setState(newState);
    //console.log(state);
  };

  const setParentConnectionLocation = (newState, parentNodeId) => {
    newState.nodes[parentNodeId].parentConnectionLocation.x =
      newState.nodes[parentNodeId].position.x;
    newState.nodes[parentNodeId].parentConnectionLocation.y =
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
