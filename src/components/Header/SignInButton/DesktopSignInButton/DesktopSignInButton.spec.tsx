import {fireEvent, render, screen, cleanup } from '@testing-library/react';
import { signOut, signIn, SignOutResponse, SignInResponse } from 'next-auth/react';
import {DesktopSignInButton} from '.';

beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
});

jest.mock('next-auth/react');

describe('DesktopSignInButton', () => {
    it('Should be render SignIn button for desktop with logged user', () => {
        jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValueOnce({
            data:{
                user:{
                    name: 'Caio Queiroz',
                    email: 'caio-queiroz@gmail.com',
                    image: 'imagem-qualquer',
                },
                expires: '1'
        }, status: 'authenticated',});
        const signOutMocked = signOut as jest.Mock<Promise<undefined | SignOutResponse>>

        render(<DesktopSignInButton/>);

        expect(screen.queryByRole('button', {name: "Caio Queiroz"})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: "Sign in with Github"})).not.toBeInTheDocument();

        fireEvent.click(screen.queryByRole('button', {name: "Caio Queiroz"}));
        expect(signOutMocked).toHaveBeenCalled();
    });

    it('Should be render SignIn button for desktop with unlogged user', () => {
        jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValueOnce({data: null, status: 'unauthenticated'});
        const signInMocked = signIn as jest.Mock<Promise<undefined | SignInResponse>>;
           
        render(<DesktopSignInButton/>);
            
        expect(screen.queryByRole('button', {name: "Caio Queiroz"})).not.toBeInTheDocument;
        expect(screen.queryByRole('button' ,{name: "Sign in with Github"})).toBeInTheDocument();

        fireEvent.click(screen.queryByRole('button' ,{name: "Sign in with Github"}));
        expect(signInMocked).toHaveBeenCalled();
    });
})