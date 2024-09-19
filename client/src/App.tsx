import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router-dom';
import Pusher from 'pusher-js';
import './App.css';
import Routes from './routes';
import { useEffect } from 'react';
function App() {
  const pusherKey = process.env.REACT_APP_PUSHER_KEY;
  useEffect(() => {
    // Initialize Pusher with your key and cluster from environment variables
    if (!pusherKey) {
      console.error("Pusher key is not defined");
      return;
    }
    const pusher = new Pusher(pusherKey, {
      cluster: 'ap2',
    });

    // Subscribe to the channel
    const leaveRequestChannel = pusher.subscribe('hello-world');

    // Bind to the event on the channel
    leaveRequestChannel.bind('hewwlo-to', function (data:any) {
      console.log('Received data:', data);
      alert(data.message); // Show alert with the message received
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      leaveRequestChannel.unbind('hewwlo-to'); // Unbind the specific event
      pusher.unsubscribe('hello-world'); // Unsubscribe from the channel
    };
  }, []);
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
