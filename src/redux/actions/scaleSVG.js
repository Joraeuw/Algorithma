export const scaleSVG = (newValue) => {
  return {
    type: 'SCALE_SVG',
    payload: { newValue },
  };
};
