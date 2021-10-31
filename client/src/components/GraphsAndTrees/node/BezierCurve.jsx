import { useState } from 'react';
import { ArrowAngle } from '../../../staticFunctions';

const BezierCurve = (props) => {
  const { startPoint, controlPoint1, controlPoint2, endPoint } = props.curve;
  const { handleMouseDown, handleMouseUp, parentNodeId, isLeft } = props;
  const [isSelected, setIsSelected] = useState(false);

  const switchIsSelected = () => {
    setIsSelected(!isSelected);
  };

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
      <ConnectingLine
        from={startPoint}
        to={controlPoint1}
        isSelected={isSelected}
      />
      <ConnectingLine
        from={controlPoint2}
        to={endPoint}
        isSelected={isSelected}
      />

      <Curve instructions={instructions} switchIsSelected={switchIsSelected} />

      <TailHandle coordinates={startPoint} />

      <SmallHandle
        coordinates={controlPoint1}
        onMouseDown={() =>
          handleMouseDown(parentNodeId, isLeft, 'controlPoint1')
        }
        onMouseUp={() => handleMouseUp()}
        isSelected={isSelected}
      />

      <SmallHandle
        coordinates={controlPoint2}
        onMouseDown={() =>
          handleMouseDown(parentNodeId, isLeft, 'controlPoint2')
        }
        onMouseUp={() => handleMouseUp()}
        isSelected={isSelected}
      />

      <HeadHandle
        coordinates={endPoint}
        crl2={controlPoint2}
        onMouseDown={() => handleMouseDown(parentNodeId, isLeft, 'endPoint')}
        onMouseUp={() => handleMouseUp(parentNodeId, isLeft, endPoint)}
      />
    </svg>
  );
};

const ConnectingLine = ({ from, to, isSelected }) => (
  <line
    x1={from.x}
    y1={from.y}
    x2={isSelected ? to.x : from.x}
    y2={isSelected ? to.y : from.y}
    stroke="rgb(200, 200, 200)"
    strokeDasharray="5,5"
    strokeWidth={2}
  />
);

const Curve = ({ instructions, switchIsSelected }) => (
  <path
    d={instructions}
    fill="none"
    stroke="rgb(213, 0, 249)"
    strokeWidth={5}
    onClick={switchIsSelected}
  />
);

const TailHandle = ({ coordinates, onMouseDown }) => (
  <ellipse
    cx={coordinates.x}
    cy={coordinates.y}
    rx={1}
    ry={1}
    fill="rgb(244, 0, 137)"
    onMouseDown={onMouseDown}
    className="cursor-drag"
  />
);
const HeadHandle = ({ coordinates, onMouseDown, crl2: crl, onMouseUp }) => {
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
      onMouseUp={onMouseUp}
      className="cursor-drag"
      fill="rgb(244, 0, 137)"
      transform={`rotate(${rotation} ${x} ${y})`}
    />
  );
};

const SmallHandle = ({ coordinates, onMouseDown, onMouseUp, isSelected }) => (
  <ellipse
    cx={coordinates.x}
    cy={coordinates.y}
    rx={isSelected ? 8 : 0}
    ry={isSelected ? 8 : 0}
    fill="transparent"
    stroke="rgb(244, 0, 137)"
    strokeWidth={2}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    className="cursor-drag scale-0"
  />
);

export default BezierCurve;
