import Header from './components/Header/Header.tsx';
import Blog from './components/Blog/Blog.tsx';
import Inquiry from './components/Inquiry/Inquiry.tsx';
import Article from './components/Article/Article.tsx'; 
import {BrowserRouter, Routes, Route} from 'react-router-dom';




function App() {
  return(
    <BrowserRouter>

    <Header />   

    <Routes>
    <Route path="/" element={<Blog />} />
    <Route path="/inquiry" element={<Inquiry />} />
    <Route path="/article/:id" element={<Article />} />
    </Routes>

    </BrowserRouter>
  );
  };



export default App;
