import './App.css';
import {Routes,Route} from 'react-router-dom'
import Register from './pages/auth/Register';
import Login from './pages/auth/Login'
import PageNotFound from './components/PageNotFound'
import Home from './pages/Home';
import Board from './pages/leaderboard/Board'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/leader-board" element={<Board/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
