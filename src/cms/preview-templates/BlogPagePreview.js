import React from 'react'
import PropTypes from 'prop-types'
import { BlogPageTemplate } from '../../templates/blog-page'

const BlogPagePreview = ({ entry, widgetFor, getAsset }) => (
  <BlogPageTemplate
    title={entry.getIn(['data', 'title'])}
    image={getAsset(entry.getIn(['data', 'image']))}
  />
)

BlogPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default BlogPagePreview
