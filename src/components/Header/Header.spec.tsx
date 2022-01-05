import {render, screen} from '@testing-library/react';
import Header from '.';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/posts/preview/algum-artigo'
            }
        }
    }
});

jest.mock('../../hooks/useWindowResize.ts', () => {
    return{
        useWindowResize(){
            return {
                width: 1000,
                height: 1000,
                isPortrait: true
            }
        }
    }
});

jest.mock('next-auth/react', () => {
    return {
        useSession(){
           return {
               data:{
                   user:{
                       name: 'Caio Queiroz',
                       email: 'caio-queiroz@gmail.com',
                       image: 'imagem-qualquer',
                   }
               },
               status: "authenticated",
            };
        }
    }
});

jest.mock('../../hooks/useModalTabNavigation.ts', () => {
    return {
        useModalTabNavigation(){
            return {
                enabledComponentModalTabNavigation(){}
            }
        }
    }
});

describe('Header Component', () => {
    it('Should be render correctly the Header', () => {
        render(
            <Header/>
        );
    
        expect(screen.getByText('Caio Queiroz')).toBeInTheDocument();
    });

    it('Should be render correctly Nav Component with base in Width', () => {
        const testeId = 'TestNavComponent'
        render(
            <Header/>
        );
    
        expect(screen.getByTestId(testeId)).toContainElement(screen.getByTestId(testeId));
    });

    it('Should be render correctly SignInButton Component with width > 921 px and logged', () => {
        render(
            <Header/>
        );
    
        expect(screen.getByText('Caio Queiroz')).toBeInTheDocument();
        expect(() => screen.getByText(/Sign in with Github/i)).toThrow();
    });
});