import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import styled from "styled-components";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`

const FeaturedItem = styled.div`
  max-width: 450px;
  text-align: justify;
  text-justify: inter-word;

`

const FeatureGrid = ({ gridItems }) => (
  <FlexColumn className="columns is-multiline">
    {gridItems.map((item) => (
      <FeaturedItem key={item.text} >
        <section className="section">
          <div className="has-text-centered">
            <div
              style={{
                width: '260px',
                display: 'inline-block',
              }}
            >
              <PreviewCompatibleImage imageInfo={item} />
            </div>
          </div>
          <p>{item.text}</p>
        </section>
      </FeaturedItem>
    ))}
  </FlexColumn>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
}

export default FeatureGrid
