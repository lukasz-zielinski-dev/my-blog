import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html{
    height:100%;
    overflow-y: auto;
  }
  body {
    min-height:100%;
    padding: 0;
    margin: 0;
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  font-family: 'Roboto', sans-serif;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  /* Fix for PrismJS white tokens */
  .token.property, .token.tag, .token.constant, .token.symbol, .token.deleted{
    background-color: inherit;
  }
  
`;

const StyledLayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledFooterWrapper = styled.div`
  margin-top: auto;
`;

const StyledNavbarWrapper = styled.div`
  border-bottom: 5px solid rgba(0, 160, 140, 0.5);
  padding-left: calc(100vw - 100%);
`;

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <StyledLayoutWrapper>
      <Helmet>
        <html lang="pl" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/ico"
          href={`${withPrefix("/")}img/favicon.ico`}
          sizes="48x48"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${useSiteMetadata().siteUrl}/img/safari-pinned-tab.svg`}
        />
      </Helmet>
      <GlobalStyles />
      <StyledNavbarWrapper>
        <Navbar />
      </StyledNavbarWrapper>

      <div>{children}</div>
      <StyledFooterWrapper>
        <Footer />
      </StyledFooterWrapper>
    </StyledLayoutWrapper>
  );
};

export default TemplateWrapper;
