import { Zoom } from '@/redux/actions/Zoom';
import store from '@/redux/store';
import { width } from '@mui/system';
import { Route, useRouteMatch } from 'react-router-dom';
import BinaryTreePanel from './panels/BinaryTreePanel';

//const scale = store.getState().scale;
const scrollSpeed = 0.5;

const handleZoom = (event) => {
  if (event.target.getAttribute('id') !== 'svgRoot') return;
  let viewBoxDigits = event.target.getAttribute('viewBox');
  console.log(viewBoxDigits);
  viewBoxDigits = viewBoxDigits.split(',').map(Number);

  viewBoxDigits[2] += event.deltaY * scrollSpeed;
  viewBoxDigits[3] += event.deltaY * scrollSpeed;

  const viewBox = {
    x: viewBoxDigits[0],
    y: viewBoxDigits[1],
    width: viewBoxDigits[2],
    height: viewBoxDigits[3],
  };
  if (viewBox.width <= 0 || viewBox.height <= 0) return;
  //console.log(viewBox);
  store.dispatch(Zoom(viewBox));
  //let newScale = scale + event.deltaY * -0.01;
};

const handleDrag = (e) => {
  const target = e.target;
  console.log(target);
};
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
    <div onWheel={handleZoom} onDrag={handleDrag} className="svg-container">
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
