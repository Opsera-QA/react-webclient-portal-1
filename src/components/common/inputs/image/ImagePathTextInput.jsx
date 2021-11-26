import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CopyToClipboardButton from "components/common/buttons/data/CopyToClipboardButton";
import ShowAndHideButton from "components/common/buttons/visibility/ShowAndHideButton";
import ImageContainer from "components/common/fields/image/ImageContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";

function ImagePathTextInput(
  {
    fieldName,
    model,
    setModel,
    className,
    disabled,
    setDataFunction,
    imageTitle,
    imageHeight,
    imageWidth,
  }) {
  const [imageShown, setImageShown] = useState(false);

  const hideImageFunction = () => {
    setImageShown(false);
  };

  const showImageFunction = async () => {
    setImageShown(true);
  };

  const getInputButtons = () => {
    return (
      <>
        <CopyToClipboardButton
          copyString={model?.getData(fieldName)}
          className={"input-button mr-2"}
        />
        <ShowAndHideButton
          showDataFunction={showImageFunction}
          hideDataFunction={hideImageFunction}
          className={"input-button"}
          valueShown={imageShown}
          disabled={hasStringValue(model?.getData(fieldName)) !== true}
        />
      </>
    );
  };

  return (
    <div>
      <TextInputBase
        className={className}
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        disabled={disabled}
        setDataFunction={setDataFunction}
        inputButtons={getInputButtons()}
      />
      <ImageContainer
        imageTitle={imageTitle}
        imageLink={model?.getData(fieldName)}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        className={"mb-2"}
        visible={imageShown === true}
      />
    </div>
  );
}

ImagePathTextInput.propTypes = {
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  imageTitle: PropTypes.string.isRequired,
  imageHeight: PropTypes.string,
  imageWidth: PropTypes.string,
};

export default ImagePathTextInput;