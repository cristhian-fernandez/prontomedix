import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import About from './Pages/About/About';
import Home from './Pages/Home/Home';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Work from './Pages/Work/Work';

function App() {
  return (
    <div className="App">
            <Switch>

              <Route exact path='/'>
                <Nav />
                <Home />
                <Footer />
              </Route>
              <Route exact path='/quienesomos'>
                <Nav />
                <About />
                <Footer />
              </Route>
              <Route exact path='/trabajaconnosotros'>
                <Nav />
                <Work />
                <Footer />
              </Route>

              <Route path="*" component={PageNotFound}/>

            </Switch>
    </div>
  );
}

export default App;
