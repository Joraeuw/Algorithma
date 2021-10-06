import BezierCurve from './BezierCurve';
import Text from 'react-svg-text';
import './node.module.css';

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
  const node = props.nodeData;
  const { handleMouseDown, handleMouseDownOnNode } = props;
  return (
    <svg>
      <BezierCurve
        handleMouseDown={handleMouseDown}
        isLeft={true}
        parentNodeId={node.id}
        curve={node.leftCurve}
      />
      <BezierCurve
        handleMouseDown={handleMouseDown}
        isLeft={false}
        parentNodeId={node.id}
        curve={node.rightCurve}
      />
      <ellipse
        onMouseDown={handleMouseDownOnNode}
        cx={node.position.x}
        cy={node.position.y}
        rx={node.r}
        ry={node.r}
        fill="white"
        stroke="rgb(244, 0, 137)"
        strokeWidth={2}
        style={{ cursor: '-webkit-grab' }}
      />
      <Text
        className="unselectable"
        x={node.position.x}
        y={node.position.y}
        verticalAnchor="start"
      >
        {node.value}
      </Text>
    </svg>
  );
};

export default Node;
