import { useState } from 'react';
import store from '../../redux/store';

//Mouse Handlers
import handleMouseUpOnNode from './MouseEvents/handleMouseUpOnNode';
import handleMouseDown from './MouseEvents/handleMouseDown';
import handleMouseLeave from './MouseEvents/handleMouseLeave';
import handleMouseUp from './MouseEvents/handleMouseUp';
import handleMouseDownOnNode from './MouseEvents/handleMouseDownOnNode';
import handleMouseMove from './MouseEvents/handleMouseMove';

import Node from './node/Node';

const Panel = (props) => {
  const state = store.getState().panelState;
  const viewBoxWidth = 1500;
  const viewBoxHeight = 1500;

  const nodes = state.nodes.map((node) => (
    <Node
      key={node.id.toString()}
      handleMouseDownOnNode={() => handleMouseDownOnNode(node.id)}
      handleMouseUpOnNode={handleMouseUpOnNode}
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      nodeId={node.id}
    />
  ));

  return (
    <svg
      id="svgRoot"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      onMouseMove={(ev) => handleMouseMove(ev)}
      onMouseLeave={() => handleMouseLeave()}
    >
      {nodes}
    </svg>
  );
};

export default Panel;
