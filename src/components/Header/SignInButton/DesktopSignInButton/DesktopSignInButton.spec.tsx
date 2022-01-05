import {fireEvent, render, screen } from '@testing-library/react';
import { useSession, signOut, signIn } from 'next-auth/react';
import {DesktopSignInButton} from '.';
import {mocked} from 'ts-jest/utils';

jest.mock('next-auth/react');

describe('DesktopSignInButton', () => {
    it('Should be render SignIn button for desktop with logged user', () => {
        const useSessionMocked = mocked(useSession);
        const signOutMocked = mocked(signOut);

        useSessionMocked.mockReturnValueOnce({
            data:{
                user:{
                    name: 'Caio Queiroz',
                    email: 'caio-queiroz@gmail.com',
                    image: 'imagem-qualquer',
                },
                expires: '1'
            }, status: 'authenticated',});

        render(
            <DesktopSignInButton/>
        );
        
        expect(screen.queryByRole('button', {name: "Caio Queiroz"})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: "Sign in with Github"})).not.toBeInTheDocument();

        fireEvent.click(screen.queryByRole('button', {name: "Caio Queiroz"}));
        expect(signOutMocked).toHaveBeenCalled();
    });

    it('Should be render SignIn button for desktop with unlogged user', () => {
        const useSessionMocked = mocked(useSession);
        const signInMocked = mocked(signIn);
        render(
            <DesktopSignInButton/>
        );
        
        useSessionMocked.mockReturnValueOnce({data: null, status: 'unauthenticated'});

        expect(screen.queryByRole('button', {name: "Caio Queiroz"})).not.toBeInTheDocument;
        expect(screen.queryByRole('button' ,{name: "Sign in with Github"})).toBeInTheDocument();

        fireEvent.click(screen.queryByRole('button' ,{name: "Sign in with Github"}));
        expect(signInMocked).toHaveBeenCalled();
    });
})