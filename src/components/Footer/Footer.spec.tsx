import {render, screen} from '@testing-library/react';
import {Footer} from '.';

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