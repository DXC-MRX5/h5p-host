import { useState} from 'react';
import "./App.css";
import Register from './components/Register';
import {BiCommand} from "react-icons/bi";

function App() {
  const [showReg, setShowReg]=useState(false);
  const handleClear = () =>{
    setShowReg(!showReg)
  }
  return (
    <div className="App">
          {showReg ? (
            <>
              <button className="btn" onClick={handleClear}>
                <BiCommand className="icn" />
              </button>
              <Register/>
            </>
          ) : (
            <button className="btn" onClick={() => setShowReg(!showReg)}>
              Register
            </button>
          )}
    </div>
  );
}

export default App;
