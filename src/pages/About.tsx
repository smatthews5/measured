import React from 'react';
import Header from '../components/Header';
import { Divider, Image, Flex, Heading } from '@chakra-ui/core';
import AboutGallery from '../components/AboutGallery';

import banner from '../assets/images/banner.png';
import loading from '../assets/images/loading.png';

const About: React.FC = () => {
  const responsiveFontSize = ['lg', 'xl', '2xl', '2xl'];

  return (
    <>
      <div id="fixed">
        <Header />
        <Divider />
      </div>
      <div id="scroll">
        <Flex
          direction="column"
          align="center"
          justify="flex-start"
          width="100vw"
          height="100%"
          overflow="scroll"
        >
          <Flex
            align="center"
            justify="center"
            bgColor="purple.400"
            w="100%"
            py={8}
          >
            <Image
              w="60vw"
              fit="cover"
              fallbackSrc={loading}
              src={banner}
              alt="welcome to Measured"
            />
          </Flex>
          <Flex
            w={['80vw', '80vw', '60vw', '60vw']}
            direction="column"
            align="center"
            justify="space-between"
            py={8}
          >
            <Heading
              as="h4"
              width="80%"
              textAlign="center"
              textTransform="uppercase"
              fontSize={['xl', '2xl', '3xl', '4xl']}
              py={3}
            >
              MEASURED is all about easy-to-use, easy-to-understand cocktail
              recipes.
            </Heading>
            <Heading
              as="h5"
              textAlign="center"
              fontSize={responsiveFontSize}
              py={3}
              fontFamily="body"
            >
              We aim to give you quality, curated recipes, with simple
              instructions and easy customisability. So you get all of the booze
              with less of the bullshit. (And definitely no blue cocktails.)
            </Heading>
          </Flex>
          <Flex w="60vw" direction="column" align="center" justify="flex-start">
            <Heading
              as="h4"
              textAlign="center"
              textTransform="uppercase"
              fontSize={['xl', '2xl', '3xl', '4xl']}
              py={4}
            >
              So, how do I use the Measured website?
            </Heading>
            <Heading
              as="h5"
              textAlign="center"
              fontSize={responsiveFontSize}
              py={3}
              fontFamily="body"
            >
              Our recipes are available to everyone. But when you sign up, you
              can filter for the ingredients you have and the kind of drinks
              that you like:
            </Heading>
            <Flex
              width="100%"
              height="60vh"
              justify="center"
              align="center"
              margin={['0px', '50px']}
            >
              <AboutGallery />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default About;
