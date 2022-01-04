import Link, { LinkProps } from 'next/link';
import {useRouter} from 'next/router';
import React, { useMemo, ReactElement } from 'react';

interface ActivedLinkProps extends LinkProps{
    activedClassName: string;
    children: ReactElement;
    subPages: boolean;
}

const ActivedLink = ({activedClassName, children, subPages, ...rest}: ActivedLinkProps) => {
    const {asPath} = useRouter();
    
    const className = useMemo(() => {
        if(subPages){
            return asPath.match("" + rest.href.toString() + "(\/(.){0,})?") !== null ? activedClassName : '';
        }

        console.log('activedLink -> asPath => ', asPath)
        console.log('activedLink -> rest.href => ', rest.href)
        console.log('activedLink -> verificação => ', asPath === rest.href)
        return asPath === rest.href ? activedClassName : '';
    }, [asPath, activedClassName, rest.href, subPages]);
    
    console.log('activedLink -> className => ', className)
    return(
        <Link {...rest}>    
            {React.cloneElement(children, {className})}
        </Link>
    );
}

export { ActivedLink }
