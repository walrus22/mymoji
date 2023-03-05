import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hello from './component/Hello';
import MainLayout from './component/MainLayout';

import './App.css';

function KK () {
  return (
    <main>
      <div>hello1</div>
    </main>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<KK />} />
          <Route path="/one" element={<Hello />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
