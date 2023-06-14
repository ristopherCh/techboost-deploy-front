import React, { useState } from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../modules/authManager";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import NavSearch from "./NavSearch";
import NavbarSearch from "./NavbarSearch";

const Header = ({ isLoggedIn, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Dropdown className="" isOpen={isOpen} toggle={toggleDropdown}>
        <DropdownToggle className="profile-dropdown padding-0">
          <img className="header-image" src={user.imageUrl} alt="User" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <MyProfile />
          </DropdownItem>
          <DropdownItem>
            <MyResources />
          </DropdownItem>
          <DropdownItem>
            <MyReviews />
          </DropdownItem>
          <DropdownItem>
            <Logout />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  const MyProfile = () => {
    return (
      <NavLink
        tag={RRNavLink}
        className="responsive-navitem padding-0 navlink-thin"
        to="/resources/users/current"
      >
        My profile
      </NavLink>
    );
  };

  const MyResources = () => {
    return (
      <NavLink
        tag={RRNavLink}
        className="responsive-navitem padding-0 navlink-thin"
        to="/resources/users/current"
      >
        My resources
      </NavLink>
    );
  };

  const MyReviews = () => {
    return (
      <NavLink
        tag={RRNavLink}
        className="responsive-navitem padding-0 navlink-thin"
        to="/reviews/user"
      >
        My reviews
      </NavLink>
    );
  };

  const Logout = () => {
    return (
      <NavLink
        tag={RRNavLink}
        to="/login"
        className="nav-link responsive-navitem padding-0 navlink-thin"
        style={{ cursor: "pointer" }}
        onClick={logout}
      >
        Logout
      </NavLink>
    );
  };

  return (
    <Navbar className="navbar-color" dark expand="lg">
      {isLoggedIn && (
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
          TechBoost
        </NavbarBrand>
      )}
      {!isLoggedIn && <NavbarBrand className="mr-auto">TechBoost</NavbarBrand>}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar id="target">
        <Nav className="mr-auto w-100 navbar-dflex" navbar>
          {isLoggedIn && (
            <>
              <div className="navbar-dflex-inner">
                {/* <NavItem
                  id="searchbar-container"
                  className="d-flex flex-column justify-content-center"
                >
                  <NavSearch />
                </NavItem> */}
                <NavItem
                  id="searchbar-container"
                  className="d-flex flex-column justify-content-center"
                >
                  <NavbarSearch />
                </NavItem>
                <NavItem className="navbar-padding">
                  <NavLink
                    className="navlink-thin"
                    tag={RRNavLink}
                    to="/resources"
                  >
                    All Resources
                  </NavLink>
                </NavItem>
                <NavItem className="">
                  <NavLink
                    className="navlink-thin"
                    tag={RRNavLink}
                    to="/resources/browse"
                  >
                    Explore
                  </NavLink>
                </NavItem>
                <NavItem className="">
                  <NavLink
                    className="navlink-thin"
                    tag={RRNavLink}
                    to="/resources/create"
                  >
                    Create resource
                  </NavLink>
                </NavItem>
              </div>
              <NavItem className="hidden-narrow">
                <ProfileDropdown />
              </NavItem>
              <NavItem className="hidden-wide">
                <MyProfile />
              </NavItem>
              <NavItem className="hidden-wide">
                <MyResources />
              </NavItem>
              <NavItem className="hidden-wide">
                <MyReviews />
              </NavItem>
              <NavItem className="hidden-wide">
                <Logout />
              </NavItem>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/register">
                  Register
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
