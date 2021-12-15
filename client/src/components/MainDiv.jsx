import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TablePage from '@pages/TablePage';
import GraphsAndTrees from '@pages/GraphsAndTreesPage';
import HomePage from '@/pages/HomePage';

import MediaControls from './OverlayControlManu/MediaControls';

const MainDiv = () => {
  return (
    <div className="mainDiv">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/graphs" component={GraphsAndTrees} />
          <Route path="/table" component={TablePage} />
        </Switch>
      </Router>
      <MediaControls maxValue={20} />
    </div>
  );
};

export default MainDiv;
