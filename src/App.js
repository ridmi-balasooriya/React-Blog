import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <NavBar />
          <div id='page_body'>
              <Routes>
                <Route path='/' element={<HomePage />} /> 
                <Route path='/about-us' element={<AboutPage />} />
                <Route path='/articles' element={<ArticlesListPage />} />
                <Route path='/articles/:articleId' element={<ArticlePage />} />
              </Routes>
          </div>
      </div>
      </BrowserRouter>
  );
}

export default App;
