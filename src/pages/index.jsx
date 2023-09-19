/** @jsx jsx */
import { Box, jsx, Text } from 'theme-ui'
import React, { useRef } from 'react'

import Layout from '../layout/layout'

import OrbCanvas from '../components/orbcanvas'
// import loadable from '@loadable/component'
import Section from '../components/section'

// const P5Sketch = loadable(() => import('../components/p5sketch'))

export default function Home() {
  // const divRef1 = useRef(null)
  const divRef2 = useRef(null)

  const articles = [
    { date: '23-3-2023', title: 'Title name 1' },
    { date: '24-3-2023', title: 'Title name 2' },
    // Add more articles here
  ]

  return (
    <>
      <Layout title="home" type="home">
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '300px',
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
            {articles.map((article, index) => (
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
                  {article.date}
                </Text>
                <Text
                  as="h2"
                  sx={{
                    fontSize: 3,
                    py: 2,
                    fontWeight: 500,
                  }}
                >
                  {article.title}
                </Text>
              </Box>
            ))}
          </Box>
        </Section>

        <Section
          title="..showcase"
          showThing={false}
          showRotateBadge={false}
        ></Section>
      </Layout>
    </>
  )
}
