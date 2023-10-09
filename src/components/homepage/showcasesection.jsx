/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import Section from './section'
import { ShowcaseItem } from './showcaseitem'

export const ShowcaseSection = ({ showcaseItems }) => {
  return (
    <Section
      title="..showcase"
      showThing={false}
      showRotateBadge={false}
      id="work"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid #71788C',
          mt: '160px',
        }}
      >
        {showcaseItems.map((showcaseItem, index) => (
          <ShowcaseItem key={index} item={showcaseItem} />
        ))}
      </Box>
    </Section>
  )
}
