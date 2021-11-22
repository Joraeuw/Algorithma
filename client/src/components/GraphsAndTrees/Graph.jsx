import Panel from './Panel';

const Graph = ({ typeOfGraph = 'binaryTree' }) => {
  const [graphType, setGraphType] = useState(typeOfGraph);

  return (
    <div className="graphDiv">
      <Panel />
    </div>
  );
};

export default Graph;
