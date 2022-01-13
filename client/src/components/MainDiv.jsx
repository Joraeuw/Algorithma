import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TablePage from '@pages/TablePage';
import GraphsAndTrees from '@pages/GraphsAndTreesPage';
import HomePage from '@/pages/HomePage';
import { useState } from 'react';

import MediaControls from './OverlayControlManu/MediaControls';

//! Path that the algorithm takes !
//It will stay in GraphsAndTrees page for now jsut o visualise!
//TODO: Remove Path from the pages when done with MediaControls implementation!
const MainDiv = () => {
  const [path, setPath] = useState('');

  return (
    <div className="mainDiv">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/graphs">
            <GraphsAndTrees path={path} setPath={setPath} />
          </Route>
          <Route path="/table" component={TablePage} />
        </Switch>
      </Router>
      <MediaControls maxValue={20} algPath={path} />
    </div>
  );
};

export default MainDiv;
