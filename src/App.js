import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageRender from './loadingAPI';
import Routes from './Routes';

class App extends Component {

  render() {
    return (
        <PageRender>
          <Router>
            <div className='App'>
              <Routes />  
            </div>
          </Router>
        </PageRender>
    )
  }
}

export default App;