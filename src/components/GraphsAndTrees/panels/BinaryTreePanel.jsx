import mouseEvents from '../MouseEvents/mouseEvents';
import Node from '../node/Node';
import { useSelector } from 'react-redux';
import handleMouseDownOnPanel from '../MouseEvents/handleMouseDownOnPanel';
import handleMouseUpOnPanel from '../MouseEvents/handleMouseUpOnPanel';

const BinaryTreePanel = () => {
  const nodesData = useSelector((state) => state.panelState).nodes;
  const viewBox = useSelector((state) => state.viewBox);

  const nodes = Object.values(nodesData).map((nodeData) => (
    <Node
      key={nodeData.id}
      nodeId={nodeData.id}
      handleMouseDownOnNode={(e) => {
        mouseEvents.handleMouseDownOnNode(e, nodeData.id);
      }}
      handleMouseUpOnNode={mouseEvents.handleMouseUpOnNode}
      handleMouseDown={mouseEvents.handleMouseDown}
      handleMouseUp={mouseEvents.handleMouseUp}
    />
  ));

  return (
    <svg
      id="svgRoot"
      className="self-stretch h-full"
      viewBox={`${viewBox.x},${viewBox.y},${viewBox.width},${viewBox.height}`}
      onMouseMove={(event) => mouseEvents.handleMouseMove(event)}
      onMouseLeave={() => mouseEvents.handleMouseLeave()}
      onMouseDown={handleMouseDownOnPanel}
      onMouseUp={handleMouseUpOnPanel}
    >
      {nodes}
    </svg>
  );
};

export default BinaryTreePanel;
