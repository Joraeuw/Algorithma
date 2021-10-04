import { useState } from 'react';
import BezierCurve from './node/BezierCurve';

const Panel = (props) => {
  const stateInit = props.InitState || {
    curves: [
      {
        id: 0,
        startPoint: props.startPoint || { x: 100, y: 100 },
        controlPoint1: props.crl1 || { x: 600, y: 300 },
        controlPoint2: props.crl2 || { x: 300, y: 300 },
        endPoint: props.endPoint || { x: 100, y: 190 },
      },
      {
        id: 1,
        startPoint: props.startPoint || { x: 100, y: 100 },
        controlPoint1: props.crl1 || { x: 600, y: 300 },
        controlPoint2: props.crl2 || { x: 300, y: 300 },
        endPoint: props.endPoint || { x: 100, y: 190 },
      },
      {
        id: 2,
        startPoint: props.startPoint || { x: 100, y: 100 },
        controlPoint1: props.crl1 || { x: 600, y: 300 },
        controlPoint2: props.crl2 || { x: 300, y: 300 },
        endPoint: props.endPoint || { x: 100, y: 190 },
      },
      {
        id: 3,
        startPoint: props.startPoint || { x: 100, y: 100 },
        controlPoint1: props.crl1 || { x: 600, y: 300 },
        controlPoint2: props.crl2 || { x: 300, y: 300 },
        endPoint: props.endPoint || { x: 100, y: 190 },
      },
    ],

    draggingPointId: null,
  };

  const [state, setState] = useState(stateInit);

  const handleMouseDown = (curveId, pointProp) => {
    setState({ ...state, draggingPointId: { pointProp, curveId } });
  };

  const handleMouseUp = () => {
    setState({ ...state, draggingPointId: null });
  };

  const handleMouseMove = ({ clientX, clientY }) => {
    const viewBoxWidth = 1800;
    const viewBoxHeight = 1800;

    const { draggingPointId } = state;
    if (!draggingPointId) {
      return;
    }
    const svgRect = document.querySelector('#svgRoot').getBoundingClientRect();

    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;
    const viewBoxX = (svgX * viewBoxWidth) / svgRect.width;
    const viewBoxY = (svgY * viewBoxHeight) / svgRect.height;
    //STATE DOES NOT SET PROPERLY
    let newState = { ...state };
    const curveId = state.draggingPointId.curveId;
    //console.log(curveId);
    //console.log(state.draggingPointId.pointProp);
    //console.log(newState.curves[curveId].startPoint);
    if (state.draggingPointId.pointProp === 'startPoint')
      newState.curves[curveId].startPoint = { x: viewBoxX, y: viewBoxY };
    else if (state.draggingPointId.pointProp === 'endPoint')
      newState.curves[curveId].endPoint = { x: viewBoxX, y: viewBoxY };
    else if (state.draggingPointId.pointProp === 'controlPoint1')
      newState.curves[curveId].controlPoint1 = { x: viewBoxX, y: viewBoxY };
    else if (state.draggingPointId.pointProp === 'controlPoint2')
      newState.curves[curveId].controlPoint2 = { x: viewBoxX, y: viewBoxY };

    setState(newState);
    //console.log(state);
  };
  //console.log(state.curves[0]);

  const curves = state.curves.map((curve) => (
    <BezierCurve
      key={curve.id.toString()}
      handleMouseDown={handleMouseDown}
      curve={curve}
    />
  ));

  return (
    <svg
      id="svgRoot"
      viewBox={`0 0 ${2000} ${2000}`}
      //ref={(node) => (this.node = node)}
      onMouseMove={(ev) => handleMouseMove(ev)}
      onMouseUp={() => handleMouseUp()}
      onMouseLeave={() => handleMouseUp()}
    >
      {curves}
    </svg>
  );
};

export default Panel;
