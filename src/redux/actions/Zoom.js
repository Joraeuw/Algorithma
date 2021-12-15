export const Zoom = (viewBox) => {
  return {
    type: 'ZOOM',
    payload: { svgViewBox: viewBox },
  };
};
