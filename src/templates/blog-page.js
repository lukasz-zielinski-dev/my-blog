import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import styled from "styled-components";

const JustifiedContent = styled.p`
  text-align: justify;
  text-justify: inter-word;
`;

export const BlogPageTemplate = ({
  image,
  title,
}) => (
  <>
   <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `50% 85%`,
      }}
    >
          <h1
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow: '0.5rem 0 0rgb(0, 160, 140), -0.5rem 0 0 rgb(0, 160, 140)',
          backgroundColor: 'rgb(0, 160, 140)',
          color: 'white',
          padding: '1rem',
        }}
      >
        {title}
      </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
        </>
);

BlogPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
};

const BlogPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <BlogPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
      />
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default BlogPage;

export const pageQuery = graphql`
  query BlogPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "blog-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
