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
        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
          {title}
        </h1>
        <StyledPhoto
          photo={
            !!photo.childImageSharp ? photo.childImageSharp.fluid.src : photo
          }
        ></StyledPhoto>

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
