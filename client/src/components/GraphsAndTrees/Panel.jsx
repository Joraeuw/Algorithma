import { Zoom } from '@/redux/actions/Zoom';
import store from '@/redux/store';
import { Route, useRouteMatch } from 'react-router-dom';
import BinaryTreePanel from './panels/BinaryTreePanel.jsx';

const scrollSpeed = 0.5;

const handleZoom = (event) => {
  const svgRoot = document.querySelector('#svgRoot');
  let viewBoxDigits = svgRoot.getAttribute('viewBox');
  viewBoxDigits = viewBoxDigits.split(',').map(Number);

  viewBoxDigits[2] += event.deltaY * scrollSpeed;
  viewBoxDigits[3] += event.deltaY * scrollSpeed;

  const viewBox = {
    x: viewBoxDigits[0],
    y: viewBoxDigits[1],
    width: viewBoxDigits[2],
    height: viewBoxDigits[3],
  };
  if (viewBox.height <= 250 || viewBox.height >= 3000) return;
  //console.log(viewBox);
  store.dispatch(Zoom(viewBox));
};

// const handleDrag = (event) => {
//   if (event.target.getAttribute('id') !== 'svgRoot') return;
//   let viewBoxDigits = event.target.getAttribute('viewBox');
//   viewBoxDigits = viewBoxDigits.split(',').map(Number);
//   //console.log(event);

//   viewBoxDigits[0] = -event.clientX;
//   viewBoxDigits[1] = -event.clientY;

//   const viewBox = {
//     x: viewBoxDigits[0],
//     y: viewBoxDigits[1],
//     width: viewBoxDigits[2],
//     height: viewBoxDigits[3],
//   };
//   store.dispatch(Zoom(viewBox));
// };
const Panel = (props) => {
  const { url } = useRouteMatch();

  return (
    <div onWheel={handleZoom} className="svg-container">
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
