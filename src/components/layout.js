import React from 'react'
import { rhythm } from '../utils/typography'
import { Footer } from './footer/footer'
import { Header } from './header/header'

class Layout extends React.Component {
  render() {
    const { siteTitle, children, headerImage, pageTitle, subtitle } = this.props
    return (
      <>
        <Header
          siteTitle={siteTitle}
          headerImage={headerImage}
          pageTitle={pageTitle}
          subtitle={subtitle}
        />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: `740px`,
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <main>{children}</main>
          <Footer />
        </div>
      </>
    )
  }
}

export default Layout
