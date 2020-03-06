import React from 'react';
import Navbar from './components/Navbar';
import CartContextProvider from './contexts/CartContext';

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <Navbar />
      </CartContextProvider>
    </div>
  );
}

export default App;
