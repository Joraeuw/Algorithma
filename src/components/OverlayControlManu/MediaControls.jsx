import { useState } from 'react';

import {
  IoPlay,
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

const MediaControls = (initialValue = 30, initialSpeed = 1) => {
  const [value, setValue] = useState(initialValue);
  const [speed, setSpeed] = useState(initialSpeed);

  return (
    <ChakraProvider>
      <div className="media-controls-container">
        <div className="media-controls">
          <Box
            display="flex"
            marginRight="0"
            marginLeft="25px"
            flex="8"
            alignSelf="center"
          >
            <span className="text-white mr-2">slow</span>
            <Slider
              aria-label="slider-ex-2"
              colorScheme="pink"
              width="8vw"
              defaultValue={initialSpeed}
              onChange={setSpeed}
              size="lg"
              max={10}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <span className="text-white ml-2">fast</span>
          </Box>

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
            <IoPlay
              className="io-media-buttons"
              onClick={() => console.log('clicked')}
            />
            <IoPlayForward
              className="io-media-buttons"
              onClick={() => console.log('clicked')}
            />
            <IoPlaySkipForward
              className="io-media-buttons"
              onClick={() => console.log('clicked')}
            />
          </Box>

          <Box marginLeft="0" marginRight="35px" flex="60" alignSelf="center">
            <Slider
              aria-label="slider-ex-2"
              colorScheme="pink"
              //width="70vw"
              defaultValue={initialValue}
              onChange={setValue}
              size="lg"
              max={20}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default MediaControls;
