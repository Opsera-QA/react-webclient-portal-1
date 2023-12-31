import React from "react";
import PropTypes from "prop-types";
import FieldTitleBar from "components/common/fields/FieldTitleBar";
import {faImage} from "@fortawesome/pro-light-svg-icons";
import StandaloneImageField from "components/common/fields/image/StandaloneImageField";

function ImageContainer(
  {
    imageTitle,
    imageLink,
    imageWidth,
    imageHeight,
    onClickFunction,
    className,
    visible,
  }) {
  const isValidImageUrl = () => {
    if ( typeof imageLink !== 'string' ) {
      return false;
    }

    return !!imageLink?.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
  };

  if (isValidImageUrl(imageLink) !== true || visible === false) {
    return null;
  }

  return (
    <div className={"d-flex image-container"}>
      <div className={className}>
        <FieldTitleBar
          customTitle={imageTitle}
          icon={faImage}
        />
        <StandaloneImageField
          imageLink={imageLink}
          imageAltText={imageTitle}
          width={imageWidth}
          height={imageHeight}
          onClickFunction={onClickFunction}
        />
      </div>
    </div>
  );
}

ImageContainer.propTypes = {
  imageLink: PropTypes.string,
  imageTitle: PropTypes.string,
  imageWidth: PropTypes.string,
  imageHeight: PropTypes.bool,
  onClickFunction: PropTypes.func,
  className: PropTypes.func,
  visible: PropTypes.bool,
};

export default ImageContainer;