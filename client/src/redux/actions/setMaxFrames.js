export const setMaxFrames = (maxFrames) => {
  return {
    type: 'SET_MAX_FRAME',
    payload: { maxFrames },
  };
};
