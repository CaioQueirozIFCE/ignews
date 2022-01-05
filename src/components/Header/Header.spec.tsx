import {render} from '@testing-library/react';
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
        width: 1000,
        height: 1000,
        isPortrait: true
    }
});

jest.mock('', () => {});

describe('Header Component', () => {
    it('Should render correctly the Header', () => {
        const { debug, getByText } = render(
            <Header/>
        );

        debug();
    });
});