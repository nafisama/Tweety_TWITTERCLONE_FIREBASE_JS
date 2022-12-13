import '../styles/globals.css';
import GlobalContextProvider from '../state/context/GlobalContext.js';
import {Toaster} from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
   <GlobalContextProvider>
      <Toaster/>
      <Component {...pageProps}/>
   </GlobalContextProvider>
  
  );
};

export default MyApp;
