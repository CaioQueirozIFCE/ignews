import React, { ReactElement, memo } from 'react';

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactElement,
    propsChildrenElement?: object
}

const Button: React.FC<Button> = ({ children, propsChildrenElement, ...rest }) => {

    return (
        <button {...rest} 
            type={rest.type || 'button'} 
            role={rest.role || 'button'}
        >
            {React.cloneElement(children, propsChildrenElement)}
        </button>
    );
}

export default memo(Button);