import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router-dom';
import './App.css';
import Routes from './routes';
function App() {
  const content = useRoutes(Routes())
  return (

    <>
         <SnackbarProvider>
        {content}
    </SnackbarProvider>
      {/* {Routes} */}
    </>

  );
}

export default App;
