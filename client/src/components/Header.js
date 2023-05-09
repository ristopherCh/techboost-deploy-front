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
    <Navbar className="color-nav" dark expand="md">
      {isLoggedIn && (
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
          TechBoost
        </NavbarBrand>
      )}
      {!isLoggedIn && <NavbarBrand className="mr-auto">TechBoost</NavbarBrand>}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="w-100" navbar>
          {isLoggedIn && (
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              <div className="d-flex flex-row">
                <NavItem className="d-flex flex-row align-items-center justify-content-center me-4">
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
                    Create new resource
                  </NavLink>
                </NavItem>
              </div>
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
            </div>
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
