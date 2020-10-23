import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import AllArticles from './pages/AllArticles';
import SingleArticle from './pages/SingleArticle';


function App() {
  return (
    <div className="App">
      <Router>
        <AllArticles path="/"/>
        <SingleArticle path='/articles/:article_id'/>
        <AllArticles path="/topic/:topic_slug"/>
      </Router>
    </div>
  );
}

export default App;
