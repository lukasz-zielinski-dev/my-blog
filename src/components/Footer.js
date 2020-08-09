// import React from 'react'
// import { Link } from 'gatsby'

// import logo from '../img/logo.svg'
// import facebook from '../img/social/facebook.svg'
// import instagram from '../img/social/instagram.svg'
// import twitter from '../img/social/twitter.svg'
// import vimeo from '../img/social/vimeo.svg'

// const Footer = class extends React.Component {
//   render() {
//     return (
//       <footer className="footer has-background-black has-text-white-ter">
//         <div className="content has-text-centered">
//           <img
//             src={logo}
//             alt="Kaldi"
//             style={{ width: '14em', height: '10em' }}
//           />
//         </div>
//         <div className="content has-text-centered has-background-black has-text-white-ter">
//           <div className="container has-background-black has-text-white-ter">
//             <div style={{ maxWidth: '100vw' }} className="columns">
//               <div className="column is-4">
//                 <section className="menu">
//                   <ul className="menu-list">
//                     <li>
//                       <Link to="/" className="navbar-item">
//                         Home
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="navbar-item" to="/about">
//                         About
//                       </Link>
//                     </li>

//                     <li>
//                       <a
//                         className="navbar-item"
//                         href="/admin/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         Admin
//                       </a>
//                     </li>
//                   </ul>
//                 </section>
//               </div>
//               <div className="column is-4">
//                 <section>
//                   <ul className="menu-list">
//                     <li>
//                       <Link className="navbar-item" to="/blog">
//                         Latest Stories
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="navbar-item" to="/contact">
//                         Contact
//                       </Link>
//                     </li>
//                   </ul>
//                 </section>
//               </div>
//               <div className="column is-4 social">
//                 <a title="facebook" href="https://facebook.com">
//                   <img
//                     src={facebook}
//                     alt="Facebook"
//                     style={{ width: '1em', height: '1em' }}
//                   />
//                 </a>
//                 <a title="twitter" href="https://twitter.com">
//                   <img
//                     className="fas fa-lg"
//                     src={twitter}
//                     alt="Twitter"
//                     style={{ width: '1em', height: '1em' }}
//                   />
//                 </a>
//                 <a title="instagram" href="https://instagram.com">
//                   <img
//                     src={instagram}
//                     alt="Instagram"
//                     style={{ width: '1em', height: '1em' }}
//                   />
//                 </a>
//                 <a title="vimeo" href="https://vimeo.com">
//                   <img
//                     src={vimeo}
//                     alt="Vimeo"
//                     style={{ width: '1em', height: '1em' }}
//                   />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     )
//   }
// }

// export default Footer

import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { FaGithub, FaYoutube, FaFacebookSquare } from "react-icons/fa";

const FooterWrapper = styled.div`
  background-color: rgba(0, 160, 140, 0.5);
  display: flex;
  padding: 5px;

  & > :first-child {
    display: none;
  }
  /* Below desktops and laptops ----------- */
  flex-direction: column;
  justify-content: start;
  @media only screen and (min-width: 1224px) {
    align-items: center;
    flex-direction: row;
    & > :first-child {
      display: block;
      visibility: hidden;
      margin-right: auto;
    }
  }
`;

const CreatedByWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  text-align: center;
  /* Below desktops and laptops ----------- */
  font-size: 1em;
  /* Desktops and laptops ----------- */
  @media only screen and (min-width: 1224px) {
    font-size: 1em;
  }
`;

const LinksWrapper = styled.div`
  display: flex;

  /* Below desktops and laptops ----------- */
  justify-content: space-around;
  /* Desktops and laptops ----------- */
  @media only screen and (min-width: 1224px) {
    justify-content: flex-end;
    margin-left: auto;
    align-items: center;
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  &:hover {
    color: ${(props) => props.higlightColor || "palevioletred"};
  }
  /* Below desktops and laptops ----------- */

  /* Desktops and laptops ----------- */
  @media only screen and (min-width: 1224px) {
    margin: 0 20px 0 0;
  }
`;

const Footer = () => (
  <FooterWrapper>
    <CreatedByWrapper>Workaround div</CreatedByWrapper>
    <CreatedByWrapper>
      © 2020 Created by Łukasz Zieliński.
    </CreatedByWrapper>



    <LinksWrapper>
      <StyledIconWrapper higlightColor="black">
        <FaGithub size={32} />
      </StyledIconWrapper>
      <StyledIconWrapper higlightColor="red">
        <FaYoutube size={32} />
      </StyledIconWrapper>
      <StyledIconWrapper higlightColor="blue">
        <FaFacebookSquare size={32} />
      </StyledIconWrapper>
    </LinksWrapper>
  </FooterWrapper>
);

export default Footer;
