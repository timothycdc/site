/** @jsx jsx */
import { Box, jsx, Text, Link } from 'theme-ui'
import React, { useRef, useState } from 'react'

import Layout from '../layout/layout'

import OrbCanvas from '../components/style-components/orbcanvas'
// import loadable from '@loadable/component'
import Section from '../components/section'

export default function Home() {
  // const divRef1 = useRef(null)
  const divRef2 = useRef(null)

  const writingItems = [
    { date: '23-3-2023', title: 'Title name 1' },
    { date: '24-3-2023', title: 'Title name 2' },
    // Add more showcaseItems here
  ]
  const showcaseItems = [
    {
      date: '2023-09-20',
      title: 'ICU Malaysian Society Website',
      description:
        'A static site blog with CMS configured for The Other Side of The Story (TOSS), a non-profit NGO raising awareness about matters relating to mental health in the youth. Powered by Hugo and Netlify.',
      sampleParagraph:
        'This is a sample paragraph for ICU Malaysian Society Website.',
    },
    {
      date: '2023-08-15',
      title: 'TOSS',
      description:
        'A static site blog with CMS configured for The Other Side of The Story (TOSS), a non-profit NGO raising awareness about matters relating to mental health in the youth. Powered by Hugo and Netlify.',
      sampleParagraph: 'This is a sample paragraph for TOSS.',
    },
    // ... more items
  ]

  const ShowcaseItem = ({ item }) => {
    const [isExpanded, setExpanded] = React.useState(false)

    return (
      <Box
        sx={{
          borderTop: '1px solid #71788C',
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Add overflow hidden
          transition: 'maxHeight 0.3s ease-out', // Transition on maxHeight
          maxHeight: isExpanded ? '500px' : '100px', // Vary maxHeight instead
        }}
      >
        <Text
          sx={{
            fontSize: '0.75em',
            color: 'darkgrey',
            mt: 2,
            mb: -2,
          }}
        >
          {item.date}
        </Text>

        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Text
            onClick={() => setExpanded(!isExpanded)} // Toggle state here
            sx={{
              background: 'white',
              borderRadius: '20px',
              border: '1.5px solid #71788C',
              p: '9px',
              fontSize: '0.75em',
              cursor: 'pointer',
              width: '90px', // Fixed width here
              textAlign: 'center', // Optional, to center the text within the button
            }}
          >
            {isExpanded ? 'collapse→' : 'expand→'}
          </Text>

          <h2
            sx={{
              fontSize: 3,
              width: '150px',
              fontWeight: 500,
              color: 'primary',
              variant: 'textStyles.special',
              ml: '5px',
            }}
          >
            {item.title}
          </h2>

          <Text sx={{ flex: 1, fontSize: '0.75em', fontWeight: 500 }}>
            {item.description}
          </Text>

          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 5,
              border: '1.3px solid',
              borderColor: `borderPrimary`,
              transition: 'transform 0.2s ease-in',
              ':hover': {
                transform: 'scale(1.03)',
              },
              ':hover > span': {
                // Assuming Text component renders to a <span>
                transform: 'translate(1.2px, -1.2px)',
              },
              cursor: 'pointer',
            }}
          >
            <img
              src="img/writing.png"
              alt="Writing"
              width="40"
              height="40"
              sx={{ ml: '5px' }}
            />
            <Text
              sx={{
                fontSize: 4,
                ml: '-5px',
                transition: 'transform 0.2s ease-in',
              }}
            >
              ↗
            </Text>
          </Box>
        </Box>
        {isExpanded && (
          <Text
            sx={{
              display: 'block',
              height: '40px',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {item.sampleParagraph}
          </Text>
        )}
      </Box>
    )
  }

  return (
    <>
      <Layout title="home" type="home">
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '220px',
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: `borderPrimary`,
            backgroundColor: 'rgba(0,0,0,0)',
          }}
        >
          <h1
            sx={{
              mt: 8,
              ml: 4,
              zIndex: 999,
              position: 'absolute',
              color: 'primary',
              variant: 'textStyles.special',
            }}
          >
            Hi, hello! Timo here.
          </h1>
          {/* <Box 
            ref={divRef1} 
            sx={{
              position: 'absolute', 
              zIndex: 40, 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              overflow: 'hidden', 
              margin: '20px 0'
            }}
          >
            <P5Sketch canvasRef={divRef1}  />
          </Box> */}
          <Box
            ref={divRef2}
            sx={{
              position: 'absolute',
              zIndex: 2,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden',
            }}
          >
            <OrbCanvas parentRef={divRef2} />
          </Box>
        </Box>
        <Section title="..info">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: ['1fr', null, '1fr 1fr'],
              gap: '20px',
              padding: '20px 0',
              fontSize: 1,
            }}
          >
            <div>
              I’m studying Electronic and Information Engineering at Imperial
              College. Interested in quant finance, software, tech,
              entrepreneurship, and machine learning. My modules specialise in
              applied mathematics, machine learning, plus topics in electrical
              engineering and computer science.
            </div>
            <div>
              I focus on a multidisciplinary approach, rapidly building up
              understanding in varied fields of knowledge to combine their
              applications advantageously, while maintaining high level to
              detail. On this page I write about my interests, log progress,
              share experiments, and try to keep everything accessible in one
              place.
            </div>
          </Box>
        </Section>

        <Section title="..writing" showThing={false} showRotateBadge={true}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              borderBottom: '1px solid #E89364',
            }}
          >
            {writingItems.map((writingItem, index) => (
              <Box
                key={index}
                sx={{
                  borderTop: '1px solid #E89364',
                  py: 5,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <Text
                  sx={{
                    fontSize: 1,
                    color: 'darkgrey',
                  }}
                >
                  {writingItem.date}
                </Text>
                <Text
                  as="h2"
                  sx={{
                    fontSize: 3,
                    py: 2,
                    fontWeight: 500,
                  }}
                >
                  {writingItem.title}
                </Text>
              </Box>
            ))}
          </Box>
        </Section>

        {/* <Section title="..showcase" showThing={false} showRotateBadge={false}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              borderBottom: '1px solid #71788C',
              mt: '160px',
            }}
          >
            {showcaseItems.map((showcaseItem, index) => (
              <Box
                key={index}
                sx={{
                  borderTop: '1px solid #71788C',
                  py: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Text
                  sx={{
                    fontSize: '0.75em',
                    color: 'darkgrey',
                    mt: 2,
                    mb: -2,
                  }}
                >
                  {showcaseItem.date}
                </Text>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    mb: 4,
                  }}
                >
                  <Text
                    sx={{
                      background: 'white',
                      borderRadius: '20px',
                      border: '1.5px solid #71788C',
                      p: '9px',
                      fontSize: '0.75em',
                    }}
                  >
                    expand→
                  </Text>

                  <h2
                    sx={{
                      fontSize: 3,
                      width: '150px',
                      fontWeight: 500,
                      color: 'primary',
                      variant: 'textStyles.special',
                      ml: '5px',
                    }}
                  >
                    {showcaseItem.title}
                  </h2>

                  <Text sx={{ flex: 1, fontSize: '0.75em', fontWeight: 500 }}>
                    {showcaseItem.description}
                  </Text>

                  <Box
                    sx={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 5,
                      border: '1.3px solid',
                      borderColor: `borderPrimary`,
                      transition: 'transform 0.2s ease-in',
                      ':hover': {
                        transform: 'scale(1.03)',
                      },
                      ':hover > span': {
                        // Assuming Text component renders to a <span>
                        transform: 'translate(1.2px, -1.2px)',
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src="img/writing.png"
                      alt="Writing"
                      width="40"
                      height="40"
                      sx={{ ml: '5px' }}
                    />
                    <Text
                      sx={{
                        fontSize: 4,
                        ml: '-5px',
                        transition: 'transform 0.2s ease-in',
                      }}
                    >
                      ↗
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Section> */}
        <Section title="..showcase" showThing={false} showRotateBadge={false}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              borderBottom: '1px solid #71788C',
              mt: '160px',
            }}
          >
            {showcaseItems.map((showcaseItem, index) => (
              <ShowcaseItem key={index} item={showcaseItem} />
            ))}
          </Box>
        </Section>

        <Section title="..more">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: ['1fr', null, '1fr 1fr'],
              gap: '20px',
              padding: '20px 0',
              fontSize: 1,
            }}
          >
            <div>
              I’m studying Electronic and Information Engineering at Imperial
              College. Interested in quant finance, software, tech,
              entrepreneurship, and machine learning. My modules specialise in
              applied mathematics, machine learning, plus topics in electrical
              engineering and computer science.
            </div>
            <div>
              I focus on a multidisciplinary approach, rapidly building up
              understanding in varied fields of knowledge to combine their
              applications advantageously, while maintaining high level to
              detail. On this page I write about my interests, log progress,
              share experiments, and try to keep everything accessible in one
              place.
            </div>
          </Box>
        </Section>
      </Layout>
    </>
  )
}
