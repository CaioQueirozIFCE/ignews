import {AppProps} from 'next/app';
import { Header } from '../components/Header';
import {SessionProvider} from 'next-auth/react';
import { ControllModalLoadingProvider } from '../contexts/ModalLoader/contextModalLoader';

import '../styles/global.scss';

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return(
    <SessionProvider session={session}>
      <ControllModalLoadingProvider>
        <Header/>
        <Component {...pageProps}/>
      </ControllModalLoadingProvider>
    </SessionProvider>
  );
}

export default MyApp
