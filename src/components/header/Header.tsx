"use client";
import React from "react";
import { Container, Logo, NavLink } from "..";
import Link from "next/link";
import {
    faHome,
    faPenToSquare,
    faRightToBracket,
    faSearch,
    faUser,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@/state/store";

function Header() {
    const authStatus = useAppSelector((state) => state.auth.status);

    const navItems = [
        { name: "Home", icon: faHome, href: "/", active: true },
        { name: "Explore", icon: faSearch, href: "/search", active: true },
        { name: "Login", icon: faRightToBracket, href: "/login", active: !authStatus },
        { name: "Signup", icon: faUserPlus, href: "/signup", active: !authStatus },
        { name: "Write", icon: faPenToSquare, href: "/post", active: authStatus },
        { name: "Profile", icon: faUser, href: "/profile", active: authStatus },
    ];

    return (
        <header id="header" className="header py-2 md:py-4 flex md:block justify-between gap-x-4 bg-white">
            <Container>
                <div className="flex justify-center">
                    <Link href={"/"}>
                        <div className="duration-150 w-12 hidden mb-4 md:flex items-center justify-center rounded-full h-12 hover:bg-primary/10 p-2.5">
                            <Logo />
                        </div>
                    </Link>
                </div>
                <ul className="flex justify-between md:block w-full">
                    {navItems.map((item) => {
                        if (item.active) {
                            return (
                                <li key={item.name}>
                                    <NavLink
                                        href={item.href}
                                        exact
                                        className="duration-150 hover:bg-primary/10 px-6 py-3 inline-flex rounded-full items-center gap-x-4 text-xl"
                                    >
                                        <span className="inline-block w-6">
                                            <FontAwesomeIcon icon={item.icon} />
                                        </span>
                                        <span className="hidden sm:inline-block">{item.name}</span>
                                    </NavLink>
                                </li>
                            );
                        }

                        return null;
                    })}
                </ul>
            </Container>
        </header>
    );
}

export default Header;
