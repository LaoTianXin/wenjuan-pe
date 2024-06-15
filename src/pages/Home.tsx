import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const Home: FC = () => {
  const nav = useNavigate()
  return (
    <div>
      <div>Home</div>
      <button onClick={() => nav('/login')}>login</button>
    </div>
  )
}

export default Home
