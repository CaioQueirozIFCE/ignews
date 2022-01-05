import {render, screen} from '@testing-library/react';
import {SignInButton} from '.';

jest.mock('next-auth/react');

describe('SignInButton Component', () => {
    it('Should be render correctly SignInButton Component with width > 921 px', () => {    
        global.visualViewport = {
            ...global.visualViewport,
            width: 1000,
        };

        render(
            <SignInButton/>
        );
        expect(screen.getByTestId('TestRenderButtonSignInForDesktop')).toBeInTheDocument();
        expect(() => screen.getByText("TestRenderButtonSignInForMobile")).toThrow();
    });

    it('Should be render correctly SignInButton Component with width < 921 px', () => {
        global.visualViewport = {
            ...global.visualViewport,
            width: 500,
        };

        render(
            <SignInButton/>
        );

        expect(() => screen.getByTestId("TestRenderButtonSignInForDesktop")).toThrow();
        expect(screen.getByTestId("TestRenderButtonSignInForMobile")).toBeInTheDocument();
    });

})