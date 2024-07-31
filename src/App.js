import './App.scss';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from 'react';
import AppRoutes from './routers/AppRoutes';

function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log('user', user)
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'))

    }
  },[])
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <AppRoutes/>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
