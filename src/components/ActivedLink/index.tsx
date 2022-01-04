import Link, { LinkProps } from 'next/link';
import {useRouter} from 'next/router';
import React, { useMemo, ReactElement, memo } from 'react';

interface ActivedLinkProps extends LinkProps{
    activedClassName: string;
    children: ReactElement;
    subPages: boolean;
}

const ActivedLink = ({activedClassName, children, subPages, ...rest}: ActivedLinkProps) => {
    const {asPath} = useRouter();
    
    // const className = useMemo(() => {
    let className;    
    if(subPages){
     className  = asPath.match("" + rest.href.toString() + "(\/(.){0,})?") !== null ? activedClassName : '';
    }else{
            className =  asPath === rest.href ? activedClassName : '';

    }

        console.log('activedLink -> asPath => ', asPath)
        console.log('activedLink -> rest.href => ', rest.href)
        console.log('activedLink -> verificação => ', asPath === rest.href)

    // }, [asPath, activedClassName, rest.href, subPages]);
    
    console.log('activedLink -> className => ', className, 'path =>', rest.href, 'asPath => ', asPath)
    return(
        <Link {...rest}>    
            {React.cloneElement(children, {className})}
        </Link>
    );
}

export default memo(ActivedLink); 
