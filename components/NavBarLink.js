import Link from "next/link"
import { useRouter } from "next/dist/client/router"
import React from "react";

export default function NavBarLink( { href, children } ) {
    const router = useRouter();

    let className = children.props.className || ""

    if(href === router.pathname) {
        className = `${className} selected`;
    }

    return (
        <Link href={ href }>
            { React.cloneElement(children, { className }) }
        </Link>
    )
}