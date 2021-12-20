import { draggingOccurs } from '@/redux/actions/draggingOccurs';
import store from '@redux/store';

const handleMouseDownOnPanel = (e) => {
  store.dispatch(draggingOccurs(true));
};

export default handleMouseDownOnPanel;
