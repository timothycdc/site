/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import Section from './section'
import { MoreItem } from './moreitem'

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
        <Box sx={{ fontWeight: 400, fontSize: 1 }}>
          My current readings are on Monte Carlo methods in computational
          finance, alongside other stochastic forms of computation. On the
          horizon, I’m looking to fuse the gap between large language models and
          financial markets, allowing for augmented ways to qualitatively
          process language data as signals for trading. Some day quantitative
          and qualitative finance will fuse into a single field of computational
          machine finance, call it whatever you’d like. I’m also working on
          projects combining deep reinforcement learning for trading.
        </Box>
        <Box sx={{ fontWeight: 400, fontSize: 1 }}>
          I grew up in Malaysia most of my life before coming to the UK to
          study. Like most local schools, I was placed into a science stream. My
          dad was an ocean engineer and my mum was a food scientist. Eventually,
          this STEM interest branched out into a developed sense of respect for
          the other parts of life, such as languages, art, the humanities and
          writing – too much to possibly write in a single paragraph here. Click
          below to expand more topics on what I’m fascinated by, specialising in
          or reading into.
        </Box>
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
          <MoreItem key={index} item={moreitem} />
        ))}
      </Box>
    </Section>
  )
}
