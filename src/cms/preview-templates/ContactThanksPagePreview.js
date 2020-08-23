import React from 'react'
import PropTypes from 'prop-types'
import { ContactThanksPageTemplate } from '../../templates/contact-thanks-page'

const ContactThanksPagePreview = ({ entry, widgetFor, getAsset }) => (
  <ContactThanksPageTemplate
    title={entry.getIn(['data', 'title'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    photo={getAsset(entry.getIn(['data', 'photo']))}
  />
)

ContactThanksPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ContactThanksPagePreview
