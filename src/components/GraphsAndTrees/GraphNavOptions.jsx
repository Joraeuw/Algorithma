import DFSByValue from './Trees/BinaryTreeDFS';
import { useSelector } from 'react-redux';

const handleClick = (setPath, rootNodeId, targetNodeId) => {
  const path = DFSByValue(rootNodeId, targetNodeId);
  setPath(path);
};

const GraphNavOptions = ({ setPath }) => {
  const rootNodeId = useSelector((state) => state.panelState.rootNodeId);
  const targetNodeId = useSelector((state) => state.panelState.targetNodeId);

  return (
    <div>
      <button
        className="bg-pink-500 rounded-md text-white p-5"
        onClick={() => handleClick(setPath, rootNodeId, targetNodeId)}
      >
        Calculate
      </button>
    </div>
  );
};

export default GraphNavOptions;
