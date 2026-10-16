import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";

const API_URL = import.meta.env.VITE_API_URL;

type User = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
};

export default function Home() {

  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>()

  useEffect(()=>{
    async function loadMe(){
      try {
        const res = await api.get("/auth/me")
        setUser(res.data)
      } catch (error) {
        setUser(null)
      }
    }
    loadMe()
  },[])

 async function logout() {
    try {
      await api.post('/auth/logout')
      setUser(null)
      setUsers([])
      setMessage('logout success')
    } catch (error) {
      setMessage('logout failed')
    }
  }

  async function handleFetchAllUsers(){
    try {
      const res = await api.get('/auth/users')
      setUsers(res.data.users)
    } catch (error) {
      setUsers([])
    }
  }

  return (
    <div>
      <h2>Home</h2>

      {user ? (
        <div>
          <p>Logged in as: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <h3>Admin test</h3>
          <button onClick={handleFetchAllUsers}>Gel All users</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>No logged in user</p>
      )}

     

      {message && <p>{message}</p>}
    </div>
  );
}
