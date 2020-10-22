import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header';
import AllArticles from './pages/AllArticles';
import SingleArticleold from './pages/SingleArticleold';


function App() {
  return (
    <div className="App">
      <Router>
        <AllArticles path="/"/>
        <SingleArticleold path='/articles/:article_id'/>
        <AllArticles path="/topic/:topic_slug"/>
      </Router>
    </div>
  );
}

export default App;
