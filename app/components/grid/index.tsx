import { FC } from 'react'
import styles from './styles.css'

export const gridLinks = () => [
  { rel: 'stylesheet', href: styles }
]

export const Grid: FC = ({ children }) => (
  <div className="grid">
    {children}
  </div>
)
