import {Orderbook} from './Orderbook';
import logo from './logo.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React Contract Example</p>
        <Orderbook />
        <a
          className="App-link"
          href="https://docs.spin.fi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Spin
        </a>
      </header>
    </div>
  );
}

export default App;
