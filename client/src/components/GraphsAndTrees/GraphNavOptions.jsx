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
      <button
        className="bg-pink-500 rounded-md text-white p-5"
        onClick={onButtonClick}
      >
        Calculate
      </button>
    </div>
  );
};

export default GraphNavOptions;
