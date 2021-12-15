import Panel from '../components/GraphsAndTrees/Panel';
import GraphNavOptions from '../components/GraphsAndTrees/GraphNavOptions';
import NodeSideBar from '@/components/GraphsAndTrees/NodeSettingsBar';
import { useState } from 'react';

function GraphsAndTrees({ typeOfGraph = 'binary' }) {
  const [path, setPath] = useState('');
  const [graphType, setGraphType] = useState(typeOfGraph);
  const [isOpen, setOpen] = useState(true);
  return (
    <div className="GraphsAndTrees">
      <GraphNavOptions setPath={setPath} />
      {/*get rid of graphType, we can easily use just direct react links */}
      <Panel graphType={graphType} />
      <NodeSideBar isOpen={isOpen} setOpen={setOpen} path={path} />
    </div>
  );
}

export default GraphsAndTrees;
