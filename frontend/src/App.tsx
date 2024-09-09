
import { useRoutes } from 'react-router-dom';
import './App.css';
import Routes from './routes';

function App() {
  const content = useRoutes(Routes())
  return (

    <>
      {content}
      {/* {Routes} */}
    </>

  );
}

export default App;
