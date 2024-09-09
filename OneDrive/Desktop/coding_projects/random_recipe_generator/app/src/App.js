import Content from './components/content/content'
import SaveRecipe from './components/SaveList/RecipeHandler'
import {RecipeContext} from './Context/context'
import {Navbar} from './navbar/navbar'
import {Instructions} from './components/content/Instructions'
import {ContentRender} from './components/content/contentRender'

function App() {
// Main component renders
  return (
    <div className="App">
      <RecipeContext>
        <Navbar/>
        <main>
        <div className='main_container'>
          <Content/>
          <div className='main_wrapper'>
            <ContentRender/>
            <SaveRecipe/>
            </div>
            <Instructions/>
          </div>
        </main>
      </RecipeContext>
    </div>
  );
}

export default App;
