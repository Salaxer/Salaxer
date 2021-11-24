import React from 'react';
import { BrowserRouter, Routes , Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Works from './pages/Works';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/works" element={<Works/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
