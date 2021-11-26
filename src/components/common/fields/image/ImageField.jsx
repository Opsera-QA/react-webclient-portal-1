import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ImageContainer from "components/common/fields/image/ImageContainer";

function ImageField(
  {
    model,
    fieldName,
    imageTitle,
    className,
  }) {

  if (model == null) {
    return null;
  }

  return (
    <div className={className}>
      <TextFieldBase
        dataObject={model}
        fieldName={fieldName}
        showClipboardButton={true}
      />
      <ImageContainer
        imageLink={model?.getData(fieldName)}
        imageTitle={imageTitle}
      />
    </div>
  );
}

ImageField.propTypes = {
  model: PropTypes.string,
  fieldName: PropTypes.string,
  imageTitle: PropTypes.string,
  className: PropTypes.func,
};

export default ImageField;