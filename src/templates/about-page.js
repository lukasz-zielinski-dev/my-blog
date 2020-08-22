import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import styled from "styled-components";

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

const StyledPhoto = styled.div`
  background-image: url(${(props) => props.photo});
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: 5px solid rgba(0, 160, 140, 0.75);
`;

const StyledContentWrapper = styled.div`
  margin-top: 50px;
  max-width: 850px;
  text-align: justify;
  text-justify: inter-word;
`;

export const AboutPageTemplate = ({
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
          <StyledPhoto
            photo={
              !!photo.childImageSharp ? photo.childImageSharp.fluid.src : photo
            }
          ></StyledPhoto>
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
            }}
          >
            {title}
          </h1>
          <div>Workaround div</div>
        </StyledRow>

        <StyledContentWrapper>
          <PageContent className="content" content={content} />
        </StyledContentWrapper>
      </StyledSection>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  photo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        photo={post.frontmatter.photo}
        content={post.html}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        photo {
          childImageSharp {
            fluid(maxWidth: 200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
