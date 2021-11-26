import { scale } from '@/settings/screen';

const ScaleReducer = (newScale = scale, action) => {
  switch (action.type) {
    case 'SCALE_SVG':
      return action.payload.newValue;

    default:
      return newScale;
  }
};
export default ScaleReducer;
