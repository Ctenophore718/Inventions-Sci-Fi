import { useState } from 'react';
import './App.css';

function App() {
  const [isGreen, setIsGreen] = useState(false);

  const handleClick = () => {
    setIsGreen(!isGreen);
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundColor: isGreen ? 'green' : 'white',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button onClick={handleClick}>Hello Inventions!</button>
    </div>
  );
}

export default App;
