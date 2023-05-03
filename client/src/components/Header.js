import React, { useEffect, useState } from "react";
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

const Header = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="color-nav" dark expand="md">
      <Nav className="mr-auto" navbar>
        {isLoggedIn && (
          <NavbarBrand tag={RRNavLink} to="/">
            TechBoost
          </NavbarBrand>
        )}
        {!isLoggedIn && <NavbarBrand>TechBoost</NavbarBrand>}
      </Nav>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          {isLoggedIn && (
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/resources">
                  Resources
                </NavLink>
              </NavItem>
              <NavLink
                tag={RRNavLink}
                to="/login"
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                <div>Logout</div>
              </NavLink>
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
