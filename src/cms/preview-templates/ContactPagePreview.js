import React from 'react'
import PropTypes from 'prop-types'
import { ContactPageTemplate } from '../../templates/contact-page'

const ContactPagePreview = ({ entry, widgetFor, getAsset }) => (
  <ContactPageTemplate
    title={entry.getIn(['data', 'title'])}
    photo={getAsset(entry.getIn(['data', 'photo']))}
    content={widgetFor('body')}
  />
)

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
}

export default ContactPagePreview
