import Login from './components/auth/login';
import Register from './components/auth/register';
import Board from './components/leaderboard/board';
import './components/leaderboard/style.css';
import { Routes, Route } from 'react-router-dom';
// import './components/auth/s';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
