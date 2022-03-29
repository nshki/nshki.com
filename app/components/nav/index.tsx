import { Link } from 'remix'
import { LogoSvg } from '~/components/svgs/logo'
import styles from './styles.css'

export const navLinks = () => [
  { rel: 'stylesheet', href: styles }
]

export const Nav = () => (
  <nav className="nav">
    <Link className="nav__logo" to="/">
      <LogoSvg width={45} height={31} />
    </Link>

    <ul className="nav__items">
      {[
        { text: 'Writing', to: '/writing' }
      ].map((navItem, index) => (
        <li key={index} className="nav__item">
          <Link to={navItem.to} className="nav__link">
            {navItem.text}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)
