const MediaControlsReducer = (
  state = {
    currentFrame: 0,
    isPlaying: false,
    maxFrames: 1,
    speed: 5,
  },
  action
) => {
  const newState = { ...state };
  switch (action.type) {
    case 'CHANGE_FRAME':
      newState.currentFrame = action.payload.frame;
      break;
    case 'PLAY':
    case 'PAUSE':
      newState.isPlaying = !state.isPlaying;
      break;
    case 'SET_MAX_FRAME':
      newState.maxFrames = action.payload.maxFrames;
      break;
    case 'SET_SPEED':
      newState.speed = action.payload.speed;
      break;
    default:
      break;
  }

  return newState;
};

export default MediaControlsReducer;
