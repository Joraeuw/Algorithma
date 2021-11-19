import { BrowserRouter as Router, Route } from 'react-router-dom';
import TablePage from '@pages/TablePage';
import GraphsAndTrees from '@pages/GraphsAndTreesPage';
import MediaControls from './OverlayControlManu/MediaControls';

const MainDiv = () => {
  return (
    <div className="mainDiv">
      <Router>
        <Route path="/graphs" component={GraphsAndTrees} />
        <Route path="/table" component={TablePage} />
      </Router>
      <MediaControls />
    </div>
  );
};

export default MainDiv;
