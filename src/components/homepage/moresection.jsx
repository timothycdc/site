/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import Section from './section'
import { ExpandItem } from './expanditem'
import data from '../../data/paragraphs.json'

export const MoreSection = ({ moreItems }) => {
  return (
    <Section
      title="..more"
      color1="white"
      color2="transparent"
      color3="#343743"
      bottomBorder={false}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', null, '1fr 1fr'],
          gap: '20px',
          padding: '20px 0',
          fontSize: 1,
          mt: '30px',
        }}
      >
        <Box sx={{ fontWeight: 400, fontSize: 1 }}>{data.more[0]}</Box>
        <Box sx={{ fontWeight: 400, fontSize: 1 }}>{data.more[1]}</Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid #71788C',
          mt: '10px',
        }}
      >
        {moreItems.map((moreitem, index) => (
          <ExpandItem key={index} item={moreitem} />
        ))}
      </Box>
    </Section>
  )
}
