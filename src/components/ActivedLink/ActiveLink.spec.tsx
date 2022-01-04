import {render} from '@testing-library/react';
import ActivedLink from '.';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

test('active Link renders correctly', () => {
    const activedClassName="styles";
    const { debug } = render(
        <ActivedLink href="/" subPages={false} passHref activedClassName={activedClassName}>
            <a>Home</a>
        </ActivedLink>
    );

    debug();
});