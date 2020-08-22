import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import styled from "styled-components";
import ContactForm from "../pages/contact/contact-form";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledContentWrapper = styled.div`
  margin-top: 50px;
  max-width: 850px;
  text-align: justify;
  text-justify: inter-word;
`;

const StyledRow = styled.div`
width: 100%;
max-width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & > :last-child {
      display: none;

    }
  
    @media only screen and (min-width: 1224px) {
    align-items: center;
    flex-direction: row;
    & > :last-child {
      display: block;
      visibility: hidden;
    }
  }
`;

export const ContactPageTemplate = ({
  title,
  photo,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section section--gradient">

      <StyledSection>
        <StyledRow>
        <div
          style={{
            width: "175px",
            display: "inline-block",
          }}
        >
          <PreviewCompatibleImage imageInfo={photo} />
        </div>
      <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              "rgb(0, 160, 140) 0.5rem 0px 0px, rgb(0, 160, 140) -0.5rem 0px 0px",
            backgroundColor: "rgb(0, 160, 140)",
            color: "white",
            lineHeight: "1",
            padding: "0.25em",
          }}
        >
          {title}
        </h1>
        <div>Workaround div</div>
        </StyledRow>
      

        

        <StyledContentWrapper>
          <PageContent className="content" content={content} />
          <ContactForm />
        </StyledContentWrapper>
      </StyledSection>
    </section>
  );
};

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  photo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        photo={post.frontmatter.photo}
        content={post.html}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const aboutPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        photo {
          childImageSharp {
            fluid(maxHeight: 175, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
