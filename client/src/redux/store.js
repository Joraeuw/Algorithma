import rootReducer from './reducers/RootReducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from '@redux/actions/draggingOccurs';

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

const store = createStore(rootReducer, composeEnhancers());
export default store;
