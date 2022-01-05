import {render, screen} from '@testing-library/react';
import { useSession } from 'next-auth/react';
import {SignInButton} from '.';
import { useWindowResize } from '../../../hooks/useWindowResize';

jest.mock('../../../hooks/useWindowResize.ts', () => {
    return{
        useWindowResize(){
            return {
                width: 500,
                height: 1000,
                isPortrait: true
            }
        }
    }
});

// jest.mock('next-auth/react', () => {
//     return {
//         useSession(){
//            return {
//                 data: null,
//                 status: "unauthenticated",
//             };
//         }
//     }
// });
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

jest.mock('../../../hooks/useModalTabNavigation.ts', () => {
    return {
        useModalTabNavigation(){
            return {
                enabledComponentModalTabNavigation(){}
            }
        }
    }
});


describe('SignInButton Component', () => {
    const session = useSession();
    const {width} = useWindowResize();

    if(session.status == "authenticated"){
        if(width > 921){
            it('Should be render correctly SignInButton Component with width > 921 px and logged', () => {
                render(
                    <SignInButton/>
                );

                expect(screen.getByText('Caio Queiroz')).toBeInTheDocument();
                expect(() => screen.getByText(/Sign in with Github/i)).toThrow();
            });
        }else{
            it('Should be render correctly SignInButton Component with width < 921 px and logged', () => {
                const authenticated = "svgGitHubLogged";
                const unauthenticated = "svgGitHubUnLogged";
                render(
                    <SignInButton/>
                );

                expect(screen.getByTestId(authenticated)).toBeInTheDocument();
                expect(() => screen.getByTestId(unauthenticated)).toThrow();
    
            });
        }
    }else if(session.status == "unauthenticated"){
        if(width > 921){
            it('Should be render correctly SignInButton Component with width > 921 px and unlogged', () => {    
                render(
                    <SignInButton/>
                );
                expect(() => screen.getByText('Caio Queiroz')).toThrow();
                expect(screen.getByText(/Sign in with Github/i)).toBeInTheDocument();
            });

        }else{
            it('Should be render correctly SignInButton Component with width < 921 px and unlogged', () => {
                const authenticated = "svgGitHubLogged";
                const unauthenticated = "svgGitHubUnLogged";
                render(
                    <SignInButton/>
                );

                expect(() => screen.getByTestId(authenticated)).toThrow();
                expect(screen.getByTestId(unauthenticated)).toBeInTheDocument();
            });
        }
    }
})