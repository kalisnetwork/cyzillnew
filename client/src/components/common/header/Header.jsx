import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuItem, NavbarMenuToggle, NavbarMenu, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, Image } from "@nextui-org/react";
import SearchBar from '../../SearchBar/SearchBar';
import Logout from '../../auth/Logout/Logout';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleDocumentClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setActiveDropdown(null);
        }
    };

    const toggleDropdown = (idx) => {
        setActiveDropdown(idx);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    };

    const menuItems = [
        { name: "Profile", link: "/profile" },
        { name: "Buy", link: "/homes" },
        { name: "Rent", link: "/homes" },
        { name: "Add New Listings", link: "/property-listing" },
        "Log Out",
    ];


    console.log('Current User:', currentUser);
    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
                <NavbarContent>
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
                    <NavbarBrand>
                        <Link href='/'>
                            <Image src="/logo.png" alt="Logo" className=' h-10 w-10 ' />
                            <h3 className="font-normal text-inherit ml-2">Cyzill</h3>
                        </Link>
                    </NavbarBrand>

                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="/homes?saleOrRent=sell" onMouseEnter={() => toggleDropdown(0)} onClick={handleLinkClick}>
                            Buy
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/homes?saleOrRent=rent" onMouseEnter={() => toggleDropdown(1)} onClick={handleLinkClick}>
                            Rent
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/property-listing" onMouseEnter={() => toggleDropdown(3)} onClick={handleLinkClick}>
                            List Your Property
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/find-agents" onMouseEnter={() => toggleDropdown(4)} onClick={handleLinkClick}>
                            Find Agents
                        </Link>
                    </NavbarItem>
                    <SearchBar />
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        {currentUser ? (
                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <User
                                        as="button"
                                        avatarProps={{
                                            isBordered: true,
                                            src: currentUser.photo,
                                            className: "h-9 w-9"
                                        }}
                                        className="transition-transform"
                                        description={`@${currentUser.username}`}
                                        name={currentUser.name}
                                    />
                                </DropdownTrigger>

                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-bold">Signed in as</p>
                                        <p className="font-bold text-primary">@{currentUser.username}</p>
                                    </DropdownItem>
                                    {menuItems.map((item, index) => (
                                        item === "Log Out" ? (
                                            <DropdownItem key="logout" color="danger">
                                                <Logout />
                                            </DropdownItem>
                                        ) : (
                                            <DropdownItem key={item.name || item}>
                                                <Link color="primary" className="w-full" href={item.link} size="sm">
                                                    {item.name}
                                                </Link>
                                            </DropdownItem>
                                        )
                                    ))}
                                </DropdownMenu>

                            </Dropdown>
                        ) : (
                            <Button as={Link} color="primary" href="/login" variant="flat">
                                Login
                            </Button>
                        )}
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu className="sm:block">
                    {menuItems.map((item, index) => (
                        item === "Log Out" ? (
                            <NavbarMenuItem key="logout" color="danger" className='text-danger'>
                                <Logout />
                            </NavbarMenuItem>
                        ) : (
                            <NavbarMenuItem key={item.name || item}>
                                <Link color="primary" className="w-full" href={item.link} size="lg">
                                    {item.name}
                                </Link>
                            </NavbarMenuItem>
                        )
                    ))}
                </NavbarMenu>

            </Navbar>
        </>
    )
}

export default Header;
