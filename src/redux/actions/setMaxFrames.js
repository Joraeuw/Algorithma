export default setMaxFrames = (maxFrames) => {
  return {
    type: 'SET_MAX_FRAME',
    payload: { maxFrames },
  };
};
