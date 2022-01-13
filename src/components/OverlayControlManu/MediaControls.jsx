import { Pause } from '@/redux/actions/Pause';
import { Play } from '@/redux/actions/Play';
import { setFrame } from '@/redux/actions/setFrame';
import { setSpeed } from '@/redux/actions/setSpeed';
import store from '@/redux/store';
import {
  Box,
  ChakraProvider,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import {
  IoPause,
  IoPlay,
  IoPlayBack,
  IoPlayForward,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

//! algPath is the ath the algorithm takes to complete the task!
//TODO: Take lines by triplets and display the changes on each slider change and/or play.
const MediaControls = ({ algPath }) => {
  
  const mediaControls = useSelector((state) => state.mediaControls);

  return (
    <ChakraProvider>
      <div className="media-controls-container">
        <div className="media-controls">
          {SpeedSlider()}
          {MediaButtons(mediaControls.isPlaying)}
          {FrameSlider(mediaControls.maxFrames)}
        </div>
      </div>
    </ChakraProvider>
  );
};

const PlaySwitch = (isPlaying) => {
  const dispatch = useDispatch();
  return isPlaying ? (
    <IoPause className="io-media-buttons" onClick={() => dispatch(Pause())} />
  ) : (
    <IoPlay className="io-media-buttons" onClick={() => dispatch(Play())} />
  );
};

const SpeedSlider = () => {
  return (
    <Box
      display="flex"
      marginRight="0"
      marginLeft="25px"
      flex="8"
      alignSelf="center"
    >
      <span className="text-white mr-3 select-none">slow</span>
      <Slider
        aria-label="slider-ex-2"
        colorScheme="pink"
        width="8vw"
        defaultValue={5}
        onChange={(speed) => store.dispatch(setSpeed(speed))}
        size="md"
        max={10}
        step={1}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <span className="text-white ml-5 select-none">fast</span>
    </Box>
  );
};

const FrameSlider = (maxFrames) => {
  return (
    <Box marginLeft="0" marginRight="35px" flex="60" alignSelf="center">
      <Slider
        aria-label="slider-ex-2"
        colorScheme="pink"
        //width="70vw"
        defaultValue={0}
        onChange={(frame) => store.dispatch(setFrame(frame))}
        size="lg"
        //max={typeof maxValue === 'number' ? maxValue : 20}
        max={maxFrames}
        step={1}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

const MediaButtons = (isPlaying, setIsPlaying) => {
  return (
    <Box
      display="flex"
      marginLeft="0"
      marginRight="0"
      flex="12"
      alignItems="center"
      justifyContent="center"
    >
      <IoPlaySkipBack
        className="io-media-buttons"
        onClick={() => console.log('clicked')}
      />
      <IoPlayBack
        className="io-media-buttons"
        onClick={() => console.log('clicked')}
      />

      {PlaySwitch(isPlaying, setIsPlaying)}

      <IoPlayForward
        className="io-media-buttons"
        onClick={() => console.log('clicked')}
      />
      <IoPlaySkipForward
        className="io-media-buttons"
        onClick={() => console.log('clicked')}
      />
    </Box>
  );
};
export default MediaControls;
