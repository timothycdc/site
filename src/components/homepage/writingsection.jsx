/** @jsx jsx */
import { Box, jsx, Text } from 'theme-ui'
import Section from './section'

export const WritingSection = ({ writingItems }) => {
  return (
    <Section
      title="..writing"
      showThing={false}
      showRotateBadge={true}
      id="writing"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // gap: 3,
          pb: 0,
          borderBottom: '1px solid #E89364',
        }}
      >
        {writingItems.map((writingItem, index) => (
          <Box
            key={index}
            sx={{
              borderTop: '1px solid #E89364',
              py: 0,
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              justifyContent: 'space-between', // This makes sure elements are spaced out
              alignItems: 'center', // Vertically centers in case of different heights
            }}
          >
            <Text
              as="h2"
              sx={{
                fontSize: 2,
                py: 5,
                fontWeight: 500,
              }}
            >
              {writingItem.title}
            </Text>
            <Text
              sx={{
                fontSize: '0.8rem',
                color: 'darkgrey',
                fontFamily: 'DM Mono, monospace',
              }}
            >
              {writingItem.date}
            </Text>
          </Box>
        ))}
      </Box>
    </Section>
  )
}
