import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @class ImageWidget
 */
class ImageWidget extends Component {
  state = {
    imageContainerRevealed: false,
  };

  toggleContainerOverlay = () => {
    const { imageContainerRevealed } = this.state;

    this.setState({ imageContainerRevealed: !imageContainerRevealed });
  };

  /**
   * @returns {JSX.Element} Image widget
   */
  render() {
    const {
      props: { images },
      state: { imageContainerRevealed },
    } = this;

    return (
      <div className="image-selector">
        <div className="img-holder">
          <img
            src={
              images.length
                ? images[0]
                : 'https://intl.9point8.ca/image/catalog/no_image_220_220.png'
            }
            alt="placeholder"
            className={`recipe-image${images.length > 1 ? ' more-images' : ''}`}
          />
          {images.length > 1 ? (
            <div
              className="overlay"
              onClick={this.toggleContainerOverlay}
              onKeyDown={e =>
                e.keyCode === 13 ? this.toggleContainerOverlay : null
              }
              role="button"
              tabIndex={0}
            >
              1 + {images.length - 1} more
            </div>
          ) : (
            ''
          )}
          {imageContainerRevealed ? (
            <div className="images-container">
              {images.map(i => (
                <img
                  src={i}
                  alt="recipe"
                  key={Date.now() + Math.random()}
                  className="recipe-images"
                />
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

ImageWidget.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageWidget;
