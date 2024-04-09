import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Dashboard from './Dashboard';
import Ingredients from './ingredients';
import Menu from './menu';
import Optimization from './optimization';
import Reports from './reports';
import Sales from './sales';
import Waste from './waste';
import Settings from './Settings';
import Grocery from './Grocery';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="optimization" element={<Optimization />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/waste" element={<Waste />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Grocery" element={<Grocery />} />
      </Routes>
    </Router>
  );
};

export default App;
