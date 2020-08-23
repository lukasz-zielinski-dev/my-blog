import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import styled from "styled-components";

const StyledSection = styled.div`
  min-height: 100%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledPhoto = styled.div`
  background-image: url(${(props) => props.photo});
  background-size: contain;
  width: 45vw;
  height: calc(539/600 * 45vw);
  margin-top: 25px;
  @media only screen and (min-width: 1224px) {
    height: 539px;
  width: 600px;
  }
`;


export const AboutPageTemplate = ({
  title,
  image,
  subtitle,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (

      <StyledSection>
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              "rgb(0, 160, 140) 0.5rem 0px 0px, rgb(0, 160, 140) -0.5rem 0px 0px",
            backgroundColor: "rgb(0, 160, 140)",
            color: "white",
            lineHeight: "1",
            padding: "0.25em",
            marginTop: "25px",
            marginBottom: "25px",
          }}
        >
          {title}
        </h1>
        <h2
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              "rgb(0, 160, 140) 0.5rem 0px 0px, rgb(0, 160, 140) -0.5rem 0px 0px",
            backgroundColor: "rgb(0, 160, 140)",
            color: "white",
            lineHeight: "1",
            padding: "0.25em",
            marginTop: "25px",
          }}
        >
          {subtitle}
        </h2>

        <StyledPhoto
          photo={
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          }
        ></StyledPhoto>
      </StyledSection>

  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        image={post.frontmatter.image}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query ContactThanksPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        image {
          childImageSharp {
            fluid(maxWidth: 600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
