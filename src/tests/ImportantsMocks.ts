const useRouterMocked = jest.spyOn(require('next/router'), 'useRouter') as jest.Mock;
const useWindowResizeMocked = jest.spyOn(require('../hooks/useWindowResize.ts'), 'useWindowResize') as jest.Mock;

export {
    useRouterMocked,
    useWindowResizeMocked,
}