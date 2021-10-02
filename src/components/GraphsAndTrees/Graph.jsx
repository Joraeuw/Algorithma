import Panel from './panel';
const Graph = ({ typeOfGraph = 'binaryTree' }) => {
  const [graphType, setGraphType] = useState(typeOfGraph);

  return (
    <div className="graphDiv">
      <Panel />
    </div>
  );
};

export default Graph;
