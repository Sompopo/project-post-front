import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage"
import UserDataPage from "./pages/UserDataPage"
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";
import { UserDataProvider } from "./context/UserContext";
//import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-tasks" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/user-data" element={<UserDataPage />} />
                <Route path="/other-tasks" element={<HomePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
      </UserDataProvider>
    </AuthProvider>
  )
}

export default App
