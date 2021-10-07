import BezierCurve from './BezierCurve';
import Text from 'react-svg-text';
import './node.module.css';

const Node = (props) => {
  const node = props.nodeData;
  const { handleMouseDown, handleMouseDownOnNode, handleMouseUp } = props;

  return (
    <svg>
      <BezierCurve
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        isLeft={true}
        parentNodeId={node.id}
        curve={node.leftCurve}
      />
      <BezierCurve
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        isLeft={false}
        parentNodeId={node.id}
        curve={node.rightCurve}
      />
      <ellipse
        onMouseDown={handleMouseDownOnNode}
        onMouseUp={() => handleMouseUp()}
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
