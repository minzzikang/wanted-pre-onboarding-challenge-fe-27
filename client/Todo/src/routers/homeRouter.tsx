import { Routes, Route } from 'react-router-dom'
import Login from "../login"
import Signup from '../signup'
import TodoList from "../todoList"

export default function HomeRouter() {
    return (
<Routes>
    <Route path="/auth" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<TodoList />} />
</Routes>
)
}