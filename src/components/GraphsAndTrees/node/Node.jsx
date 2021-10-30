import BezierCurve from './BezierCurve';
import Text from 'react-svg-text';
import './node.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Node = (props) => {
  const id = props.nodeId;
  const node = useSelector((state) => state.panelState).nodes[id];

  const {
    handleMouseDown,
    handleMouseDownOnNode,
    handleMouseUp,
    handleMouseUpOnNode,
  } = props;
  const [value, setValue] = useState('null');

  return (
    <svg>
      <BezierCurve
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        isLeft={true}
        parentNodeId={id}
        curve={node.leftCurve}
      />
      <BezierCurve
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        isLeft={false}
        parentNodeId={id}
        curve={node.rightCurve}
      />
      <ellipse
        onMouseDown={handleMouseDownOnNode}
        onMouseUp={() => handleMouseUpOnNode(node)}
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
