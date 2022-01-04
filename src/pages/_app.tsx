import {AppProps} from 'next/app';
import Header  from '../components/Header';
import {SessionProvider} from 'next-auth/react';
import { ControllModalLoadingProvider } from '../contexts/ModalLoader/contextModalLoader';
import {ControlModalTabNavigationProvider} from '../contexts/TabNavigation/contextTabNavigation';
import { Footer } from '../components/Footer';
import { useWindowResize } from '../hooks/useWindowResize';
import { useEffect } from 'react';
import {monitorScreenHeight} from '../utils/monitorScreen';
import '../styles/global.scss';

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
    const {width} = useWindowResize() || {width: 1000};

    useEffect(() => {
      monitorScreenHeight();
      window.addEventListener('resize', monitorScreenHeight);

      () => window.removeEventListener('resize', monitorScreenHeight);
    }, []);

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
