import React from "react";
import PropTypes from "prop-types";

function StandaloneImageField(
  {
    imageLink,
    imageAltText,
    width,
    height,
    onClickFunction,
    className,
  }) {
  const getImageClassNames = () => {
    let imageClassNames;

    if (onClickFunction) {
      imageClassNames = "pointer";
    }

    if (className) {
      imageClassNames = imageClassNames ? `${imageClassNames} ${className}` : className;
    }

    return imageClassNames;
  };

  if (imageLink == null) {
    return null;
  }

  return (
    <div className={"content-container"}>
      <img
        src={imageLink}
        alt={imageAltText}
        width={width}
        height={height}
        onClick={onClickFunction}
        className={getImageClassNames()}
      />
    </div>
  );
}

StandaloneImageField.propTypes = {
  imageLink: PropTypes.string,
  imageAltText: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.bool,
  onClickFunction: PropTypes.func,
  className: PropTypes.func,
};

export default StandaloneImageField;