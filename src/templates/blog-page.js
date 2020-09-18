import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

import Layout from "../components/Layout";
import styled from "styled-components";

const JustifiedContent = styled.p`
  text-align: justify;
  text-justify: inter-word;
`;

export const BlogPageTemplate = ({ image, title, posts }) => (
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
          boxShadow: "0.5rem 0 0rgb(0, 160, 140), -0.5rem 0 0 rgb(0, 160, 140)",
          backgroundColor: "rgb(0, 160, 140)",
          color: "white",
          padding: "1rem",
        }}
      >
        {title}
      </h1>
    </div>
    <section className="section">
      <div className="container">
        <div className="content">
          <div className="columns is-multiline">
            {posts &&
              posts.map(({ node: post }) => (
                <div className="is-parent column is-6" key={post.id}>
                  <article
                    className={`blog-list-item tile is-child box notification ${
                      post.frontmatter.featuredpost ? "is-featured" : ""
                    }`}
                  >
                    <header>
                      {post.frontmatter.featuredimage ? (
                        <div className="featured-thumbnail">
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.featuredimage,
                              alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                            }}
                          />
                        </div>
                      ) : null}
                      <p className="post-meta">
                        <Link
                          className="title has-text-primary is-size-4"
                          to={post.fields.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                        <br />
                        <span className="subtitle is-size-5 is-block">
                          {post.frontmatter.date}
                        </span>
                      </p>
                    </header>
                    <p>
                      {post.frontmatter.description}
                      <br />
                      <br />
                      <Link className="button" to={post.fields.slug}>
                        Czytaj dalej →
                      </Link>
                    </p>
                  </article>
                </div>
              ))}
          </div>
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
  const frontmatter = data.BlogPageTemplate.frontmatter;
  const edges = data.PreviewCards.edges;
  console.log(edges);
  return (
    <Layout>
      <BlogPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        posts={edges}
      />
    </Layout>
  );
};

BlogPage.propTypes = {
  data: PropTypes.shape({
    BlogPageTemplate: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    PreviewCards: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default BlogPage;

export const pageQuery = graphql`
  query {
    BlogPageTemplate: markdownRemark(
      frontmatter: { templateKey: { eq: "blog-page" } }
    ) {
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
    PreviewCards: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            templateKey
            date(formatString: "DD/MM/YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
