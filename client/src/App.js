import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Products from './pages/Products';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
