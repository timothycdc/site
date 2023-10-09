/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import React, { useRef } from 'react'
import Layout from '../layout/layout'
import { InfoSection } from '../components/homepage/infosection'
import { WritingSection } from '../components/homepage/writingsection'
import { MoreSection } from '../components/homepage/moresection'
import { ShowcaseSection } from '../components/homepage/showcasesection'
import data from '../data/data.json'

import OrbCanvas from '../components/style-components/orbcanvas'
// import loadable from '@loadable/component'
import Section from '../components/homepage/section'

export default function Home() {
  // const divRef1 = useRef(null)
  const divRef2 = useRef(null)

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
        <InfoSection infoItems={data.infoItems} />
        <WritingSection writingItems={data.writingItems} />
        <ShowcaseSection showcaseItems={data.showcaseItems} />
        <MoreSection moreItems={data.moreItems} />
      </Layout>
    </>
  )
}
