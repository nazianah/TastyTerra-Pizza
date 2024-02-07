import Layout from "./components/Layout/Layout";
import axios from "axios";
import { UserContextProvider } from './context/userContext';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'https://tasty-terra-pizza-server-phi.vercel.app/';
axios.defaults.withCredentials = true;

function App() {
  
  return (
   
    <UserContextProvider>
       <Toaster />
      <Layout />
    </UserContextProvider>
  )

}

export default App;
