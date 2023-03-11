import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MainLayout from './layout/MainLayout';
import Home from './component/Home';
import Search from './component/Search';
import Setting from './component/Setting';
import Detail from './component/Detail';
import Test from './component/Test';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/setting" element={<Setting/>} />
          <Route path="/test" element={<Test/>} />
          <Route path="/detail/:platform/:id" element={<Detail/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
