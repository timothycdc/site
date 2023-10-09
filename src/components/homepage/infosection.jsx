/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import Section from './section'

export const InfoSection = () => {
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
          applications advantageously, while maintaining high level to detail.
          On this page I write about my interests, log progress, share
          experiments, and try to keep everything accessible in one place.
        </div>
      </Box>
    </Section>
  )
}
