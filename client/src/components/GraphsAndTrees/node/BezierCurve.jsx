import { useState } from 'react';

const BezierCurve = (props) => {
  const { id, startPoint, controlPoint1, controlPoint2, endPoint } =
    props.curve;
  const { handleMouseDown } = props;
  const instructions = `
        M ${startPoint.x},${startPoint.y}
        C ${controlPoint1.x},${controlPoint1.y}
          ${controlPoint2.x},${controlPoint2.y}
          ${endPoint.x},${endPoint.y}
      `;
  return (
    <svg
      style={{
        overflow: 'visible',
        width: '100%',
        border: '1px solid',
      }}
    >
      <ConnectingLine from={startPoint} to={controlPoint1} />
      <ConnectingLine from={controlPoint2} to={endPoint} />

      <Curve instructions={instructions} />

      <TailHandle
        coordinates={startPoint}
        onMouseDown={() => handleMouseDown(id, 'startPoint')}
      />

      <HeadHandle
        coordinates={endPoint}
        crl2={controlPoint2}
        onMouseDown={() => handleMouseDown(id, 'endPoint')}
      />

      <SmallHandle
        coordinates={controlPoint1}
        onMouseDown={() => handleMouseDown(id, 'controlPoint1')}
      />

      <SmallHandle
        coordinates={controlPoint2}
        onMouseDown={() => handleMouseDown(id, 'controlPoint2')}
      />
    </svg>
  );
};

const ConnectingLine = ({ from, to }) => (
  <line
    x1={from.x}
    y1={from.y}
    x2={to.x}
    y2={to.y}
    stroke="rgb(200, 200, 200)"
    strokeDasharray="5,5"
    strokeWidth={2}
  />
);

const Curve = ({ instructions }) => (
  <path
    d={instructions}
    fill="none"
    stroke="rgb(213, 0, 249)"
    strokeWidth={5}
  />
);

const TailHandle = ({ coordinates, onMouseDown }) => (
  <ellipse
    cx={coordinates.x}
    cy={coordinates.y}
    rx={15}
    ry={15}
    fill="rgb(244, 0, 137)"
    onMouseDown={onMouseDown}
    style={{ cursor: '-webkit-grab' }}
  />
);
const HeadHandle = ({ coordinates, onMouseDown, crl2: crl }) => {
  const { x, y } = coordinates;
  const h = 30;
  const point1 = {
    x: x + h / 3,
    y: y - (Math.sqrt(3) / 3) * h,
  };
  const point2 = {
    x: x + h / 3,
    y: y + (Math.sqrt(3) / 3) * h,
  };
  const point3 = {
    x: x - (2 * h) / 3,
    y: y,
  };
  const rotation = ArrowAngle(crl, coordinates);

  return (
    <polygon
      points={`${point1.x},${point1.y} ${point2.x},${point2.y} ${point3.x},${point3.y}`}
      onMouseDown={onMouseDown}
      style={{ cursor: '-webkit-grab' }}
      fill="rgb(244, 0, 137)"
      transform={`rotate(${rotation} ${x} ${y})`}
    />
  );
};

//Calculating the angle at which the arrow must be displayed
// 1. Evaluate the derivative at end point
// 2. calculate the roration angle
const ArrowAngle = (crl, end) => {
  //Full bezie curve term
  //const by =
  //3 * (1 - t) ** 2 * (crl1.y - start.y) +
  //6 * (1 - t) * t * (crl2.y - crl1.y) +
  //3 * t ** 2 * (end.y - crl2.y);

  // Fix at crl2.x === end.x
  if (crl.x === end.x) return crl.y > end.y ? -30 : 30;

  //determine in which quadrant the point is:
  //Q1 adds 0 deg
  let additional = 0;
  //Q4 add 360 deg
  if (crl.y > end.y && crl.x > end.x) additional = 360;
  //Q2 and Q3 add 180 deg
  else if (crl.x < end.x) additional = 180;

  const unitVelocityVector = {
    x: end.x - crl.x,
    y: end.y - crl.y,
  };

  const theta =
    (Math.atan(unitVelocityVector.y / unitVelocityVector.x) * 180) / Math.PI;

  return theta + additional;
};

const SmallHandle = ({ coordinates, onMouseDown }) => (
  <ellipse
    cx={coordinates.x}
    cy={coordinates.y}
    rx={8}
    ry={8}
    fill="transparent"
    stroke="rgb(244, 0, 137)"
    strokeWidth={2}
    onMouseDown={onMouseDown}
    style={{ cursor: '-webkit-grab' }}
  />
);

export default BezierCurve;
