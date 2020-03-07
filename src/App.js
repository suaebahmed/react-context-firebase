import React from 'react';
import Nav from './components/Nav';
import Main from './components/Main';
import Routes from './routes'

function App() {
  return (
    <div className="App">

      <marquee>
        <h1 style={{color: 'blue'}}>hello Arif mamu</h1>
      </marquee>

      <Nav></Nav>
      {/* <Main>
      </Main> */}
        <Routes/>
    </div>
  );
}

export default App;
