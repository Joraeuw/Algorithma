import { viewBoxWidth, viewBoxHeight } from '@/settings/screen';

const PanelZoomMoveReducer = (
  svgViewBox = {
    x: 0,
    y: 0,
    width: viewBoxWidth,
    height: viewBoxHeight,
  },
  action
) => {
  switch (action.type) {
    case 'ZOOM':
      return action.payload.svgViewBox;

    default:
      return svgViewBox;
  }
};
export default PanelZoomMoveReducer;
