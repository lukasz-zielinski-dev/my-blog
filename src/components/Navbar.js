import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const Brand = styled(Link)`
  margin: 0;
  

  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  font-family: "Roboto", sans-serif;
  text-align: center;
  color: rgb(0, 160, 140);
  /* Below desktops and laptops ----------- */
  font-size: 1em;
  /* Desktops and laptops ----------- */
  @media only screen and (min-width: 1224px) {
    font-size: 2em;
  }
`;

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  };

  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container has-text-primary">
          <div className="navbar-brand">
            <Brand to="/" className="navbar-item" title="Logo">
              Łukasz Zieliński
            </Brand>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                O mnie
              </Link>
              <Link className="navbar-item" to="/projects">
                Projekty
              </Link>
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
              <Link className="navbar-item" to="/contact">
                Kontakt
              </Link>
            </div>
            <div className="navbar-end has-text-centered"></div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
