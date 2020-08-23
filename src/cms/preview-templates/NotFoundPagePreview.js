import React from 'react'
import PropTypes from 'prop-types'
import { NotFoundPageTemplate } from '../../templates/404-page'

const AboutPagePreview = ({ entry, getAsset }) => (
  <NotFoundPageTemplate
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    photo={getAsset(entry.getIn(['data', 'photo']))}
  />
)

NotFoundPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default NotFoundPagePreview
