/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import React, { useRef } from 'react'
import Layout from '../layout/layout'
import { InfoSection } from '../components/homepage/infosection'
import { WritingSection } from '../components/homepage/writingsection'
import { MoreSection } from '../components/homepage/moresection'
import { ShowcaseSection } from '../components/homepage/showcasesection'

import OrbCanvas from '../components/style-components/orbcanvas'
// import loadable from '@loadable/component'
import Section from '../components/homepage/section'

export default function Home() {
  // const divRef1 = useRef(null)
  const divRef2 = useRef(null)

  const infoItems = [
    {
      title: 'Quantitative Finance',
      tags: 'reinforcement learning, monte carlo, black-scholes, heston models',
      paragraph:
        'I like complex topics revolving around problem solving, fuelled by passion in the fields of mathematics, statistics, and machine learning. Such problems call their home in the field of quantitative finance, where I’m currently working on projects in the field.',
    },
    {
      title: 'Software Engineering',
      tags: 'javascript web fun, functional programming, low-level languages',
      paragraph:
        'I like complex topics revolving around problem solving, fuelled by passion in the fields of mathematics, statistics, and machine learning. Such problems call their home in the field of quantitative finance, where I’m currently working on projects in the field.',
    },
    {
      title: 'Machine Learning',
      tags: 'reinforcement learning, monte carlo, black-scholes, heston models',
      paragraph:
        'I like complex topics revolving around problem solving, fuelled by passion in the fields of mathematics, statistics, and machine learning. Such problems call their home in the field of quantitative finance, where I’m currently working on projects in the field.',
    },
  ]

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
      paragraph:
        'This is a sample paragraph for ICU Malaysian Society Website.',
    },
    {
      date: '2023-08-15',
      title: 'TOSS',
      description:
        'A static site blog with CMS configured for The Other Side of The Story (TOSS), a non-profit NGO raising awareness about matters relating to mental health in the youth. Powered by Hugo and Netlify.',
      paragraph: 'This is a sample paragraph for TOSS.',
    },
    // ... more items
  ]

  const moreItems = [
    {
      title: 'Quantitative Finance',
      tags: 'reinforcement learning, monte carlo, black-scholes, heston models',
      paragraph:
        'I like complex topics revolving around problem solving, fuelled by passion in the fields of mathematics, statistics, and machine learning. Such problems call their home in the field of quantitative finance, where I’m currently working on projects in the field.',
    },
    {
      title: 'Software Engineering',
      tags: 'javascript web fun, functional programming, low-level languages',
      paragraph:
        'I like complex topics revolving around problem solving, fuelled by passion in the fields of mathematics, statistics, and machine learning. Such problems call their home in the field of quantitative finance, where I’m currently working on projects in the field.',
    },
    {
      title: 'Machine Learning',
      tags: 'reinforcement learning, monte carlo, black-scholes, heston models',
      paragraph:
        'I like complex topics revolving around problem solving, fuelled by passion in the fields of mathematics, statistics, and machine learning. Such problems call their home in the field of quantitative finance, where I’m currently working on projects in the field.',
    },
  ]

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
          <span
            sx={{
              mt: 6,
              zIndex: 999,
              position: 'absolute',
              color: 'background',
              backgroundColor: 'primary',
              px: 4,
              ml: 4,
              // variant: 'textStyles.special',
              // fontFamily: 'Inter, sans-serif',
              fontFamily: 'special',
              fontStyle: 'normal',
              fontSize: 6,
              width: 'fit-content',
              overflow: 'hidden',
              fontWeight: 500,
            }}
          >
            Welcome! Timo here.
          </span>

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
        <InfoSection infoItems={infoItems} />
        <WritingSection writingItems={writingItems} />
        <ShowcaseSection showcaseItems={showcaseItems} />
        <MoreSection moreItems={moreItems} />
      </Layout>
    </>
  )
}
