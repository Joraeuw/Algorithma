import Node from './node/Node';
import DFSByValue from './Trees/BinaryTreeDFS';

const onButtonClick = () => {
  //SHOULD MAKE A SELECTOR FOR THIS
  const value = 'node0';
  const path = DFSByValue(value);
  console.log(path);
};

const GraphNavOptions = () => {
  return (
    <div>
      <button className="bg-pink-300 rounded-md" onClick={onButtonClick}>
        Calculate
      </button>
    </div>
  );
};

export default GraphNavOptions;
