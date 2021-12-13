import BezierCurve from './BezierCurve';
import Text from '@globals/Text';
import './node.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Node = (props) => {
  const id = props.nodeId;
  const node = useSelector((state) => state.panelState).nodes[id];
  const nodeColor = node.isTarget
    ? 'green'
    : node.isRoot
    ? 'blue'
    : 'rgb(244, 0, 137)';

  const {
    handleMouseDown,
    handleMouseDownOnNode,
    handleMouseUp,
    handleMouseUpOnNode,
  } = props;
  const [value, setValue] = useState('null');

  return (
    <g id={node.id}>
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
        onMouseDown={(e) => handleMouseDownOnNode(e, id)}
        onMouseUp={(e) => handleMouseUpOnNode(node)}
        cx={node.position.x}
        cy={node.position.y}
        rx={node.r}
        ry={node.r}
        stroke={nodeColor}
        strokeWidth={4}
        className="cursor-drag fill-current text-white"
      />
      <Text
        className="unselectable pointer-events-none"
        x={node.position.x}
        y={node.position.y}
        verticalAnchor="middle"
        textAnchor="middle"
      >
        {node.value}
      </Text>
    </g>
  );
};

export default Node;
