import styles from './styles.css'

export const timelineLinks = () => [
  { rel: 'stylesheet', href: styles }
]

export const Timeline = () => (
  <ul className="timeline">
    {[
      {
        title: 'Atomic',
        url: 'https://atomic.vc/',
        date: 'Jul 2021 – Present',
        description: 'Engineer in residence'
      },
      {
        title: 'Litmus',
        url: 'https://www.litmus.com/',
        date: 'Nov 2019 – Jul 2021',
        description: 'Senior software engineer'
      },
      {
        title: 'Roundtrip',
        url: 'https://roundtriphealth.com/',
        date: 'Feb 2019 – Nov 2019',
        description: 'Senior software engineer'
      },
      {
        title: 'Wide Eye',
        url: 'https://wideeye.co/',
        date: 'Feb 2018 – Feb 2019',
        description: 'Software engineer'
      },
      {
        title: 'Padilla',
        url: 'https://padillaco.com/',
        date: 'Jun 2017 – Jan 2018',
        description: 'Full-stack developer'
      },
      {
        title: 'INM United',
        url: 'https://inmunited.com/',
        date: 'Aug 2012 – Jun 2017',
        description: 'Full-stack developer'
      },
      {
        title: 'Freelance',
        date: 'July 2006 – Present',
        description: 'Web designer & developer'
      }
    ].map((timelineItem, index) => (
      <li key={`timeline-item-${index}`} className="timeline__item">
        <div>
          <p className="timeline__item__title">
            {timelineItem.url
              ? <a href={timelineItem.url}>{timelineItem.title}</a>
              : timelineItem.title}
            {`, ${timelineItem.date}`}
          </p>
          <p>{timelineItem.description}</p>
        </div>
      </li>
    ))}
  </ul>
)
