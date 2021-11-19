import { useState } from 'react';

import {
  IoPlay,
  IoPause,
  IoPlayForward,
  IoPlayBack,
  IoPlaySkipForward,
  IoPlaySkipBack,
} from 'react-icons/io5';

import {
  ChakraProvider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react';

const MediaControls = ({ maxValue }) => {
  const [value, setValue] = useState(0);
  const [speed, setSpeed] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ChakraProvider>
      <div className="media-controls-container">
        <div className="media-controls">
          {SpeedSlider(setSpeed)}
          {MediaButtons(isPlaying, setIsPlaying)}
          {ValueSlider(setValue, maxValue)}
        </div>
      </div>
    </ChakraProvider>
  );
};

const PlaySwitch = (isPlaying, setIsPlaying) => {
  return isPlaying ? (
    <IoPause className="io-media-buttons" onClick={() => setIsPlaying(false)} />
  ) : (
    <IoPlay className="io-media-buttons" onClick={() => setIsPlaying(true)} />
  );
};

const SpeedSlider = (setSpeed) => {
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
        onChange={setSpeed}
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

const ValueSlider = (setValue, maxValue) => {
  return (
    <Box marginLeft="0" marginRight="35px" flex="60" alignSelf="center">
      <Slider
        aria-label="slider-ex-2"
        colorScheme="pink"
        //width="70vw"
        defaultValue={0}
        onChange={setValue}
        size="lg"
        //max={typeof maxValue === 'number' ? maxValue : 20}
        max={maxValue}
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
