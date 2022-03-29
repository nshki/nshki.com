import styles from './styles.css'

export const footerLinks = () => [
  { rel: 'stylesheet', href: styles }
]

export const Footer = () => (
  <footer className="footer">
    <ul className="footer__items">
      {[
        { text: 'Email', href: 'mailto:hello@nshki.com' },
        { text: 'Twitter', href: 'https://twitter.com/nshki_' },
        { text: 'GitHub', href: 'https://github.com/nshki' },
        { text: 'Source', href: 'https://github.com/nshki/nshki.com' }
      ].map((footerLink, index) => (
        <li key={`footer-link-${index}`} className="footer__item">
          <a href={footerLink.href}>{footerLink.text}</a>
        </li>
      ))}
    </ul>

    <p>{`© Nishiki Liu`}</p>
  </footer>
)
