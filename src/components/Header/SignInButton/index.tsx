import React, { useCallback } from "react";
import { useModalTabNavigation } from "../../../hooks/useModalTabNavigation";
import { useWindowResize } from "../../../hooks/useWindowResize";
import {DesktopSignInButton} from './DesktopSignInButton';
import { MobileSignInButton } from "./MobileSignInButton";

const SignInButton: React.FC = () => {
    const {width} = useWindowResize() || {width: 1000};
    const { enabledComponentModalTabNavigation } = useModalTabNavigation();

    const setSigInButtonSize = useCallback((width: number | undefined) => { 
        const typeDevice = width > 700 ? 'desktop' : 'mobile';
        const buttonSize = {
            'desktop': <DesktopSignInButton/>,
            'mobile': <MobileSignInButton enabledComponentModalTabNavigation={enabledComponentModalTabNavigation}/>
        }
        return buttonSize[typeDevice] ? buttonSize[typeDevice] : null;
    }, []);

    return(
        <>
            {setSigInButtonSize(width)}
        </>
    );
}

export { SignInButton }