import store from '@redux/store';
import { draggingOccurs } from '@/redux/actions/draggingOccurs';

const handleMouseUpOnPanel = (e) => {
  store.dispatch(draggingOccurs(false));
};

export default handleMouseUpOnPanel;
