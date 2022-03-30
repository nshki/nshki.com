import {Link} from 'remix'
import styles from './styles.css'

export const cardLinks = () => [
  { rel: 'stylesheet', href: styles }
]

export const Card = ({
  to = '',
  title = '',
  date = '',
  description = '',
  large = false
}) => (
  <Link
    className={`card ${large && `card--large`}`}
    to={to}
  >
    <span className="card__title">{title}</span>
    <span className="card__description">{description}</span>
    <time className="card__date">{date}</time>
  </Link>
)
