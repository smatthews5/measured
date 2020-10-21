import React, { useState } from 'react';
import { Image, Flex, IconButton } from '@chakra-ui/core';

import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import one from '../assets/images/one.png';
import two from '../assets/images/two.png';
import three from '../assets/images/three.png';
import four from '../assets/images/four.png';
import five from '../assets/images/five.png';
import six from '../assets/images/six.png';
import loadingWhite from '../assets/images/loadingWhite.png';

const About: React.FC = () => {
  const images = [one, two, three, four, five, six];
  const [index, setIndex] = useState<number>(0);
  const [image, setImage] = useState(images[index]);

  const handleRightClick = () => {
    if (index == images.length - 1) return;
    const newIndex = index + 1;
    setIndex(newIndex);
    const updateImage = images[newIndex];
    setImage(updateImage);
  };

  const handleLeftClick = () => {
    if (index <= 0) return;
    const newIndex = index - 1;
    setIndex(newIndex);
    const updateImage = images[newIndex];
    setImage(updateImage);
  };

  return (
    <Flex
      width="100%"
      height="100%"
      minWidth="350px"
      align="center"
      justify="center"
      margin={['0px', '100px']}
    >
      <IconButton
        aria-label="Change index"
        icon={<ChevronLeftIcon fontSize="3xl" />}
        height="50%"
        alignSelf="center"
        // marginRight={['0px', '20px']}
        background="white"
        color="purple.400"
        onClick={handleLeftClick}
      />
      <Image
        alignSelf="center"
        margin="20px"
        width="100%"
        py={4}
        fit="cover"
        src={image}
        fallbackSrc={loadingWhite}
        alt="welcome to Measured"
      />
      <IconButton
        aria-label="Change index"
        icon={<ChevronRightIcon fontSize="3xl" />}
        height="50%"
        alignSelf="center"
        // marginLeft={['0px', '20px']}
        background="white"
        color="purple.400"
        onClick={handleRightClick}
      />
    </Flex>
  );
};

export default About;
