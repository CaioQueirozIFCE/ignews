import {AppProps} from 'next/app';
import { Header } from '../components/Header';
import {SessionProvider} from 'next-auth/react';
import { ControllModalLoadingProvider } from '../contexts/ModalLoader/contextModalLoader';
import {ControlModalTabNavigationProvider} from '../contexts/TabNavigation/contextTabNavigation';
import '../styles/global.scss';
import { Footer } from '../components/Footer';
import { useWindowResize } from '../hooks/useWindowResize';

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
    const {width} = useWindowResize() || {width: 1000};
  
    return(
    <SessionProvider session={session}>
      <ControllModalLoadingProvider>
        <ControlModalTabNavigationProvider>
          <Header/>
          <Component {...pageProps}/>
          {width < 921 && <Footer/>}
        </ControlModalTabNavigationProvider>
      </ControllModalLoadingProvider>
    </SessionProvider>
  );
}

export default MyApp
