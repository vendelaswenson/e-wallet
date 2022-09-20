import { Link } from 'react-router-dom'
import './MainHeader.css'

const MainHeader = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/cards">Alla kort</Link>
          </li>
          <li>
            <Link to="/addcard">Lägg till kort</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainHeader
