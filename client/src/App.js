import React from 'react';
import RoutingComponent from './components/RoutingComponent';
import CartContextProvider from './contexts/CartContext';

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <RoutingComponent />
      </CartContextProvider>
    </div>
  );
}

export default App;
