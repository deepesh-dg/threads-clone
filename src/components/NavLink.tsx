"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    href: string;
    exact?: boolean;
    [key: string]: any;
}>;

export default function NavLink({ href, exact, children, ...props }: Props) {
    const pathname = usePathname();
    const active = " font-bold";
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += active;
    }

    return (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}
