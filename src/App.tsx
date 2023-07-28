import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { UserLogin } from "./components/UserLogin";
import { UserRegister } from "./components/UserSignup";
import SavedPasswords from "./components/SavedPasswords";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<HomePage/>}/>
          <Route path="/login" element={ <UserLogin/>} />
          <Route path="/register" element={ <UserRegister/>} />
          <Route path="/user-passwords" element={<SavedPasswords/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
