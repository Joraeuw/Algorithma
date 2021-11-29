import Panel from '../components/GraphsAndTrees/Panel';
import GraphNavOptions from '../components/GraphsAndTrees/GraphNavOptions';
import NodeSideBar from '@/components/GraphsAndTrees/NodeSettingsBar';
import { useState } from 'react';
import store from '@/redux/store';

function GraphsAndTrees({ typeOfGraph = 'binary' }) {
  const [path, setPath] = useState('');
  const [graphType, setGraphType] = useState(typeOfGraph);
  const [isOpen, setOpen] = useState(true);
  return (
    <div className="GraphsAndTrees">
      <GraphNavOptions setPath={setPath} />
      <Panel />
      <NodeSideBar isOpen={isOpen} setOpen={setOpen} path={path} />
    </div>
  );
}

export default GraphsAndTrees;
