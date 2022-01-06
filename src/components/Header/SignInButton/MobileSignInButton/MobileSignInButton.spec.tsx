import {fireEvent, render, screen, cleanup } from '@testing-library/react';
import {MobileSignInButton} from '.';

beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
});

jest.mock('next-auth/react');

describe('MobileSignInButton', () => {
    const authenticated = "svgGitHubLogged";
    const unauthenticated = "svgGitHubUnLogged";

    it('Should be render SignIn button for mobile with logged user', () => {
        jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValueOnce({
            data:{
                user:{
                    name: 'Caio Queiroz',
                    email: 'caio-queiroz@gmail.com',
                    image: 'imagem-qualquer',
                },
                expires: '1'
        }, status: 'authenticated',});
        const enabledComponentModalTabNavigation = jest.fn();

        render(<MobileSignInButton enabledComponentModalTabNavigation={enabledComponentModalTabNavigation}/>);

        expect(screen.queryByTestId(authenticated)).toBeInTheDocument();
        expect(screen.queryByTestId(unauthenticated)).not.toBeInTheDocument();

        fireEvent.click(screen.queryByRole('button'));
        expect(enabledComponentModalTabNavigation).toHaveBeenCalled();
    });

    it('Should be render SignIn button for desktop with unlogged user', async () => {
        jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValueOnce({data: null, status: 'unauthenticated'});
        const enabledComponentModalTabNavigation = jest.fn();
        
        render(<MobileSignInButton enabledComponentModalTabNavigation={enabledComponentModalTabNavigation}/>);
            
        expect(screen.queryByTestId(authenticated)).not.toBeInTheDocument;
        expect(screen.queryByTestId(unauthenticated)).toBeInTheDocument();

        fireEvent.click(screen.queryByRole('button'));
        expect(enabledComponentModalTabNavigation).toHaveBeenCalled();
    });
})