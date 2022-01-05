import {render} from '@testing-library/react';
import ActivedLink from '.';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/posts/preview/algum-artigo'
            }
        }
    }
})

describe('Active Link Component', () => {
    it('should be renders correctly', () => {
        const activedClassName="active";
        const { getByText } = render(
            <ActivedLink href="/posts" subPages={true} passHref activedClassName={activedClassName}>
                <a>Posts</a>
            </ActivedLink>
        );

        expect(getByText('Posts')).toBeInTheDocument()
    });

    it('should be receiving active class if link is current', () => {
        const activedClassName="active";
        const { getByText } = render(
            <ActivedLink href="/posts" subPages={true} passHref activedClassName={activedClassName}>
                <a>Posts</a>
            </ActivedLink>
        );

        expect(getByText('Posts')).toHaveClass('active');
    });
});