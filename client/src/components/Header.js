import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../modules/authManager";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import NavSearch from "./NavSearch";

const Header = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="navbar-color" dark expand="lg">
      {isLoggedIn && (
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
          TechBoost
        </NavbarBrand>
      )}
      {!isLoggedIn && <NavbarBrand className="mr-auto">TechBoost</NavbarBrand>}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto w-100" navbar>
          {isLoggedIn && (
            <>
              <NavItem
                id="searchbar-container"
                className="d-flex flex-column justify-content-center"
              >
                <NavSearch />
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/resources">
                  Resources
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/resources/browse">
                  Browse
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/resources/create">
                  Create resource
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/resources/users/current">
                  My resources
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/reviews/user">
                  My reviews
                </NavLink>
              </NavItem>

              <div className="ml-auto">
                <NavLink
                  tag={RRNavLink}
                  to="/login"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={logout}
                >
                  <div>Logout</div>
                </NavLink>
              </div>
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
