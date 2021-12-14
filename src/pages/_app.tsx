import {AppProps} from 'next/app';
import { Header } from '../components/Header';
import {SessionProvider} from 'next-auth/react';
import { ControllModalLoadingProvider } from '../contexts/ModalLoader/contextModalLoader';

import '../styles/global.scss';
import { Footer } from '../components/Footer';
import { useWindowResize } from '../hooks/useWindowResize';

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
    const {width} = useWindowResize() || {width: 1000};
    console.log('width: ' + width)
  return(
    <SessionProvider session={session}>
      <ControllModalLoadingProvider>
        <Header/>
        <Component {...pageProps}/>
        {width < 921 && <Footer/>}
      </ControllModalLoadingProvider>
    </SessionProvider>
  );
}

export default MyApp
