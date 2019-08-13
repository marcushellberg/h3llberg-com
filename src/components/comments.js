import React from 'react'

class Comments extends React.Component {
  constructor(...args) {
    super(...args)
    this.ref = React.createRef()
  }
  componentDidMount() {
    const loadCommento = () => {
      const commentoScript = document.createElement('script')
      commentoScript.src = 'https://cdn.commento.io/js/commento.js'
      commentoScript.setAttribute('async', true)
      this.ref.current.appendChild(commentoScript)
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadCommento()
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '0px 0px 300px 0px',
        }
      )
      observer.observe(document.querySelector('#comments'))
    } else {
      setTimeout(loadCommento, 1000)
    }
  }

  render() {
    return (
      <>
        <div ref={this.ref} id="comments" />
        {this.props.category !== 'Page' ? (
          <>
            <h4>Comments</h4>
            <div id="commento" />
          </>
        ) : (
          ''
        )}
      </>
    )
  }
}
