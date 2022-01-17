export const setCurveBoolean = (nodeId, key, value, isRight) => {
  return {
    type: 'SET_CURVE_BOOLEAN',
    payload: { nodeId, key, value, isRight },
  };
};
