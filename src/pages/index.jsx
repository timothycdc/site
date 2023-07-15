/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../layout/layout'
import siteConfig from '../../gatsby-config'
import NoteList from '../components/note-list'
import Search from '../components/search'

import theme from '../gatsby-plugin-theme-ui'
// import '../styles/index.css'
import { DefaultMenuStructure, MenuRoot } from '../utils/menu-structure'

export default function Home() {
  

  return (
    <>
    <Layout title="home" type="home">
    <h1 sx={{color : ['red', 'green', 'blue']}}>This is the homepage</h1>
    </Layout>
    </>
  )
}
