export const setCurveColor = (nodeId, className, isRight) => {
  return {
    type: 'SET_CURVE_COLOR',
    payload: { nodeId, className, isRight },
  };
};
