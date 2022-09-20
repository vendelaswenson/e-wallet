import { Routes, Route } from 'react-router-dom'
import { fetchRandomUser } from './redux/cardSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AddCard from './pages/AddCard'
import Cards from './pages/Cards'
import MainHeader from './components/MainHeader'
import NotFound from './pages/NotFound'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchRandomUser())
  }, [dispatch])

  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<Cards />}></Route>
          <Route path="/addcard" element={<AddCard />}></Route>
          <Route path="/cards" element={<Cards />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
