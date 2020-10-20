import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header';
import AllArticles from './pages/AllArticles';
import SingleArticle from './pages/SingleArticle';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <AllArticles path="/"/>
        <SingleArticle path='/articles/:article_id'/>
        <AllArticles path="/topic"/>
      </Router>
    </div>
  );
}

export default App;
