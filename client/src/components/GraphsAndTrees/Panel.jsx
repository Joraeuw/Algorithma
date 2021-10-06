import { useState } from 'react';
import BezierCurve from './node/BezierCurve';
import Node from './node/Node';

const Panel = (props) => {
  const init = { id: 0, r: 50, position: { x: 100, y: 100 } };
  const startInitR = getStartPoint(init.position, init.r, -45);
  const startInitL = getStartPoint(init.position, init.r, 225);
  const stateInit = {
    nodes: [
      {
        id: init.id,
        r: init.r,
        position: init.position,
        value: 'node0',
        rightCurve: {
          id: 0,
          value: 'node1',
          isConnected: false,
          startPoint: startInitR,
          controlPoint1: startInitR,
          controlPoint2: startInitR,
          endPoint: startInitR,
        },
        leftCurve: {
          id: 1,
          value: 'node2',
          isConnected: false,
          startPoint: startInitL,
          controlPoint1: startInitL,
          controlPoint2: startInitL,
          endPoint: startInitL,
        },

        parentConnectionLocation: {
          x: init.position,
          y: init.position - init.r,
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

  const handleMouseUp = () => {
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

    setState(newState);
    //console.log(state);
  };

  const handleMouseDownOnNode = (nodeId) => {
    setState({
      ...state,
      draggingObjectId: { nodeId },
    });
  };
  //console.log(state.curves[0]);

  /*const curves = state.curves.map((curve) => (
    <BezierCurve
      key={curve.id.toString()}
      handleMouseDown={handleMouseDown}
      curve={curve}
    />
  ));*/

  return (
    <svg
      id="svgRoot"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      //ref={(node) => (this.node = node)}
      onMouseMove={(ev) => handleMouseMove(ev)}
      onMouseUp={() => handleMouseUp()}
      onMouseLeave={() => handleMouseUp()}
    >
      <Node
        handleMouseDownOnNode={() => handleMouseDownOnNode(0)}
        handleMouseDown={handleMouseDown}
        nodeData={state.nodes[0]}
      />
    </svg>
  );
};

const getStartPoint = ({ x, y }, r, theta) => {
  theta *= Math.PI / 180;
  const result = { x: x + r * Math.cos(theta), y: y - r * Math.sin(theta) };
  return result;
};

export default Panel;
