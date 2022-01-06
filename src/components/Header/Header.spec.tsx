import {render, screen, cleanup} from '@testing-library/react';
import { useRouterMocked, useWindowResizeMocked} from '../../tests/ImportantsMocks';
import Header from '.';

beforeEach(cleanup);

jest.mock('next-auth/react')

describe('Header Component', () => {
    it('Should be render correctly the Header', () => {
        useRouterMocked.mockImplementation(() => ({ asPath: '/' }));
        useWindowResizeMocked.mockImplementation(() => ({ width: 1000 }));
        render(
            <Header/>
        );

        expect(screen.getByTestId("TestHeaderElement")).toBeInTheDocument();
    });

    it('Should be render correctly Nav Component with base in Width', () => {
        useRouterMocked.mockImplementation(() => ({ asPath: '/' }));
        useWindowResizeMocked.mockImplementation(() => ({ width: 500 }));
        
        render(
            <Header/>
        );
            
        expect(screen.queryByText("Home")).not.toBeInTheDocument();       
    });
});