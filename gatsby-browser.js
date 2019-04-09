// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

export const onClientEntry = () => {
  // IntersectionObserver polyfill (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    require(`intersection-observer`)
  }
}
