import {render, screen} from '@testing-library/react';
import {SignInButton} from '.';
import { useWindowResizeMocked } from '../../../tests/ImportantsMocks';

jest.mock('next-auth/react');

describe('SignInButton Component', () => {
    it('Should be render correctly SignInButton Component with width > 921 px', () => {    
        useWindowResizeMocked.mockImplementation(() => ({ width: 1000 }));
        render(
            <SignInButton/>
        );
        expect(screen.getByTestId('TestRenderButtonSignInForDesktop')).toBeInTheDocument();
        expect(() => screen.getByTestId("TestRenderButtonSignInForMobile")).toThrow();
    });

    it('Should be render correctly SignInButton Component with width < 921 px', () => {
        useWindowResizeMocked.mockImplementation(() => ({ width: 500 }));
        render(
            <SignInButton/>
        );

        expect(() => screen.getByTestId("TestRenderButtonSignInForDesktop")).toThrow();
        expect(screen.getByTestId("TestRenderButtonSignInForMobile")).toBeInTheDocument();
    });

})