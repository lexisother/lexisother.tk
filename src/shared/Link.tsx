import {Link as InternalLink} from "gatsby";
import React from "react";

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    href: string;
    target?: string;
    activeClassName?: string;
    activeExact?: boolean;
}

export default function Link({
    href,
    target,
    className,
    activeClassName,
    activeExact,
    ...props
}: LinkProps): JSX.Element {
    return (
        <InternalLink
            {...props}
            className={className}
            activeClassName={activeClassName}
            partiallyActive={!activeExact}
            to={href}
            target={target}
        />
    );
}
