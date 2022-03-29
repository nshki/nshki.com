import { IllustrationSvg } from '~/components/svgs/illustration'
import styles from './styles.css'

export const heroLinks = () => [
  { rel: 'stylesheet', href: styles }
]

export const Hero = () => (
  <article className="hero">
    <div className="hero__content">
      <p className="hero__paragraph">
        <strong>{`Hi there, my name is Nishiki.`}</strong>
        {`
          I'm a full-stack developer that enjoys everything from writing
          stylesheets to tweaking cloud infrastructure. And illustrating
          sometimes.
        `}
      </p>
    </div>

    <div className="hero__illustration" aria-hidden>
      <IllustrationSvg width={558} height={384} />
    </div>
  </article>
)
