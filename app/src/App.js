import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import RecipeEditCreate from './components/RecipeEditCreate';

function App() {
  return (
    <Router>
      <Routes>
	    //<Route path="/" element={<RecipeList />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/edit-recipe/:id" element={<RecipeEditCreate />} />
        <Route path="/create-recipe" element={<RecipeEditCreate />} />
      </Routes>
    </Router>
  );
}

export default App;

