import React from 'react';
import Header from '../components/Header';
import { Divider, Image, Flex, Heading } from '@chakra-ui/core';
import AboutGallery from '../components/AboutGallery';

import banner from '../assets/images/banner.png';
import loading from '../assets/images/loading.png';

const About: React.FC = () => {
  const responsiveFontSize = ['lg', 'xl', '2xl', '2xl'];
  const responsiveWidth = ['90%', '90%', '80%', '80%'];
  const responsiveNote = ['md', 'lg', 'xl', 'xl'];

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
            w={['80vw', '80vw', '60vw', '50vw']}
            direction="column"
            align="center"
            justify="space-between"
            py={8}
          >
            <Heading
              as="h4"
              width={responsiveWidth}
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
              width={responsiveWidth}
              fontSize={responsiveFontSize}
              py={3}
              fontFamily="body"
            >
              We aim to give you quality, curated recipes, with simple
              instructions and easy customisability. So you get all of the booze
              with less of the bullshit. (And definitely no blue cocktails.)
            </Heading>
          </Flex>
          <Flex
            w={['80vw', '80vw', '60vw', '50vw']}
            mb={8}
            direction="column"
            align="center"
            justify="flex-start"
          >
            <Heading
              as="h4"
              width={responsiveWidth}
              textAlign="center"
              textTransform="uppercase"
              fontSize={['xl', '2xl', '3xl', '4xl']}
              py={4}
            >
              Why should I sign up?
            </Heading>
            <Heading
              as="h5"
              width={responsiveWidth}
              textAlign="center"
              fontSize={responsiveFontSize}
              pt={3}
              mb={5}
              fontFamily="body"
            >
              Our recipes are available to everyone. But when you sign up, you
              can filter for the ingredients you have and the kind of drinks
              that you like:
            </Heading>
            <Heading
              as="h4"
              width={responsiveWidth}
              textAlign="center"
              textTransform="uppercase"
              fontSize={['xl', '2xl', '3xl', '4xl']}
              pt={4}
            >
              How do I use the Measured website?
            </Heading>
            <Flex
              width={['80%', '80%', '100%', '100%']}
              justify="center"
              align="center"
            >
              <AboutGallery />
            </Flex>
            <Heading
              as="h4"
              width={responsiveWidth}
              textTransform="uppercase"
              fontSize={responsiveNote}
              py={3}
            >
              Note on attribution
            </Heading>
            <Heading
              as="h5"
              width={responsiveWidth}
              fontSize={responsiveNote}
              py={3}
            >
              Measured was created as a learning exercise and is still actively
              being developed and improved. All images are the rightful property
              of their original creators and owners, and any images that are not
              royalty-free are being used temporarily. The Measured team do not
              claim any ownership over them.
            </Heading>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default About;
