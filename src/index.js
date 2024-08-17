import './index.css'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

const Body = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Body} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </React.StrictMode>
)
