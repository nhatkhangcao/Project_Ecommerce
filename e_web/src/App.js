import './App.css';
import Routing from './route/Routing';
import { BrowserRouter } from 'react-router-dom';
import './css/style.css'
import './js/style'

function App() {
  return (
    <BrowserRouter>
      <Routing>
      </Routing>
    </BrowserRouter>
  );
}

export default App;
