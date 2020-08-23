import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProjectPagePreview from './preview-templates/ProjectPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import BlogPagePreview from './preview-templates/BlogPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import ContactThanksPagePreview from './preview-templates/ContactThanksPagePreview'
import NotFoundPagePreview from './preview-templates/ContactThanksPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('projects', ProjectPagePreview)
CMS.registerPreviewTemplate('blog', BlogPagePreview)
CMS.registerPreviewTemplate('blog-post', BlogPostPreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
CMS.registerPreviewTemplate('contact-thanks', ContactThanksPagePreview)
CMS.registerPreviewTemplate('404', NotFoundPagePreview)
