import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { DiscussionEmbed } from "disqus-react";
import styled from "styled-components";

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;

  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  font-family: "Roboto", sans-serif;
  text-align: justify;
  text-justify: inter-word;
`;

const PostTitle = styled.h1``;

const PostDescription = styled.p``;

const PostHeader = styled.div`
  @media only screen and (min-width: 1224px) {
    max-width: 950px;
    margin: 0 auto;
  }
  padding-bottom: 50px;
`;
const PostBody = styled.div`
  @media only screen and (min-width: 1224px) {
    max-width: 800px;
    margin: 0 auto;
  }
  & > div > blockquote {
    border-left: 10px solid rgba(0, 160, 140, 0.75);
    padding: 10px;
    background-color: rgba(0, 160, 140, 0.1);
  }

  & > div > p > img {
    width: 100%;
  }
`;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  id,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: id, title },
  };

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <PostContainer>
          <PostHeader>
            <PostTitle>{title}</PostTitle>
            <PostDescription>{description}</PostDescription>
          </PostHeader>

          <PostBody>
            <PostContent content={content} />
            <DiscussionEmbed {...disqusConfig} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tagi</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </PostBody>
        </PostContainer>
      </div>
    </section>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        id={post.id}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
