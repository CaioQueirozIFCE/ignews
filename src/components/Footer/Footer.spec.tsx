import {render, screen} from '@testing-library/react';
import {Footer} from '.';
import { useRouterMocked } from '../../tests/ImportantsMocks';

useRouterMocked.mockImplementation(() => ({ asPath: '/' }));

describe('Footer Component', () => {
    it('Should be render correctly the Footer', () => {
        render(
            <Footer/>
        );

        expect(screen.getByTestId("TestFooterComponent")).toBeInTheDocument();
    });

    it('Should be render correctly Nav/Footer Component with base in Width', () => {
        const testeId = 'TestNavComponentFooter'
        render(
            <Footer/>
        );
    
        expect(screen.getByTestId(testeId)).toContainElement(screen.getByTestId(testeId));
    });
});