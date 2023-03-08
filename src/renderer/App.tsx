import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MainLayout from './component/MainLayout';
import Home from './component/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
