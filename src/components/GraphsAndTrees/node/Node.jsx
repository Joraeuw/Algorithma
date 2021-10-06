import BezierCurve from './BezierCurve';
import Text from 'react-svg-text';

const getStartPoint = ({ x, y }, r, theta) => {
  theta *= Math.PI / 180;
  const result = { x: x + r * Math.cos(theta), y: y - r * Math.sin(theta) };
  return result;
};

const Node = (props) => {
  /*const init = { id: 0, r: 50, position: { x: 100, y: 100 } };
  const startInitR = getStartPoint(init.position, init.r, -45);
  const startInitL = getStartPoint(init.position, init.r, 225);
  const { handleMouseDown } = props;*/
  const state = props.nodeData;
  const { handleMouseDown, handleMouseDownOnNode } = props;
  return (
    <svg>
      <BezierCurve
        handleMouseDown={handleMouseDown}
        isLeft={true}
        parentNodeId={0}
        curve={state.leftCurve}
      />
      <BezierCurve
        handleMouseDown={handleMouseDown}
        isLeft={false}
        parentNodeId={0}
        curve={state.rightCurve}
      />
      <ellipse
        onMouseDown={handleMouseDownOnNode}
        cx={state.position.x}
        cy={state.position.y}
        rx={state.r}
        ry={state.r}
        fill="white"
        stroke="rgb(244, 0, 137)"
        strokeWidth={2}
        style={{ cursor: '-webkit-grab' }}
      />
      {<Text
        className="unselectable"
        x={state.position.x}
        y={state.position.y}
        verticalAnchor="start"
      >
        {props.nodeData.value}
      </Text>}
    </svg>
  );
};

export default Node;
