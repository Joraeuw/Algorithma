import { Route, useRouteMatch } from 'react-router-dom';
import { scaleSVG } from '@/redux/actions/scaleSVG';
import BinaryTreePanel from './panels/BinaryTreePanel';


//const scale = store.getState().scale;

// const handleZoom = (event) => {
//   //event..preventDefault();
//   console.log(event);
//   let newScale = scale + event.deltaY * -0.01;

//   //Restrict to be bigger than 0
//   newScale = Math.min(Math.max(0, newScale), 4);
//   console.log(newScale);

//   store.dispatch(scaleSVG(newScale));
// };
const Panel = (props) => {
  const { url } = useRouteMatch();
  //console.log(nodes);
  //const viewBoxWidth = 1500;
  //const viewBoxHeight = 1500;

  return (
    <div
      /*onWheel={handleZoom}*/ className="svg-container overflow-scroll h-screen w-screen"
    >
      <Route path={`${url}/binaryTree`}>
        <BinaryTreePanel />
      </Route>
      <Route path={`${url}/generalTree`}>
        {/* GENERAL TREE ROUTE. AWAITS IMPLEMENTATION */}
      </Route>
    </div>
  );
};

export default Panel;
