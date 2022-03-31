import { Timeline, timelineLinks } from '~/components/timeline'
import styles from './styles.css'

export const aboutLinks = () => [
  { rel: 'stylesheet', href: styles },
  ...timelineLinks()
]

export const About = () => (
  <div className="about">
    <aside className="about__aside">
      <Timeline />
    </aside>

    <div className="about__main">
      <p className="about__paragraph">
        {`Currently, I work at `}
        <a href="https://atomic.vc">{`Atomic`}</a>
        {` helping founders launch companies.`}
      </p>

      <p className="about__paragraph">
        {`
          I started off building for the web in 2005 after discovering
          Photoshop, HTML, and CSS. I've since worked with freelance clients,
          web agencies, early & late-stage startups, and a VC studio.
        `}
      </p>

      <p className="about__paragraph">
        {`
          My passions are in building delightful things and systematizing them.
          Validating business ideas, collaborating on design systems,
          thinking through & implementing complex features, and hiring for &
          augmenting engineering teams are some examples of work I particularly
          enjoy.
        `}
      </p>

      <p className="about__paragraph">
        {`
          If you think there could be a good opportunity for us to work
          together, 
        `}
        <a href="mailto:hello@nshki.com">{`please reach out`}</a>{`.`}
      </p>
    </div>
  </div>
)
