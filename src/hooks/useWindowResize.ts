import {useState, useEffect} from 'react';

interface IUseWindowResizeProps{
    width: number | undefined;
    height: number | undefined;
    isPortrait: boolean | undefined;
}

const useWindowResize = () : IUseWindowResizeProps => {
    const [windowSize, setWindowSize] = useState<IUseWindowResizeProps>();

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                isPortrait:
                    window.screen &&
                    window.screen.orientation &&
                    window.screen.orientation.angle
                        ? !window.screen.orientation.angle
                        : true,
            });
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

export { useWindowResize }