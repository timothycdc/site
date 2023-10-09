/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import Section from './section'
import { ExpandItem } from './expanditem'
import data from '../../data/paragraphs.json'

export const InfoSection = ({ infoItems }) => {
  return (
    <Section title="..info" id="info">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', null, '1fr 1fr'],
          gap: '20px',
          padding: '20px 0',
          fontSize: 1,
        }}
      >
        <div>{data.info[0]}</div>
        <div>{data.info[1]}</div>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid #71788C',
          mt: '10px',
        }}
      >
        {infoItems.map((infoItem, index) => (
          <ExpandItem key={index} item={infoItem} />
        ))}
      </Box>
    </Section>
  )
}
