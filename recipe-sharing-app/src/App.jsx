import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>
            <Link to="/">Recipe Finder</Link>
          </h1>
          <nav>
            <Link to="/add" className="nav-link">Add Recipe</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <div className="search-container">
                  <SearchBar />
                  <FilterPanel />
                </div>
                <RecipeList />
              </>
            } />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;