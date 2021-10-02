import Panel from '../components/GraphsAndTrees/Panel';
import GraphNavOptions from '../components/GraphsAndTrees/GraphNavOptions';

import { useState } from 'react';

function GraphsAndTrees({ typeOfGraph = 'binary' }) {
  const [graphType, setGraphType] = useState(typeOfGraph);

  return (
    <div className="GraphsAndTrees">
      <GraphNavOptions />
      <Panel />
    </div>
  );
}

export default GraphsAndTrees;
