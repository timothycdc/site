/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import Header from './header'

export default function Layout({ children, title, type, ...props }) {
  return (
<>
      <Header title={title} type={type} />
      <section className="section">
        <div className="columns is-centered">{children}</div>
      </section>
</>
  )
}
