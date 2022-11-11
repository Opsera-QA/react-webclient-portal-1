import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";
import IconBase from "components/common/icons/IconBase";
import InfoText from "components/common/inputs/info_text/InfoText";

function StandaloneTextFieldBase(
  {
    label,
    text,
    className,
    showClipboardButton,
    isBusy,
    infoMessage,
    errorMessage,
  }) {
  const getClipboardButton = () => {
    if (showClipboardButton === true) {
      return (<CopyToClipboardIcon className={"my-auto ml-auto"} copyString={text} />);
    }
  };

  return (
    <FieldContainer className={className}>
      <div className={"w-100 d-flex"}>
        <label className={"mb-0 mr-2 text-muted"}><span>{label}:</span></label>
        <span><IconBase className={"mr-2"} isLoading={isBusy} />{text}</span>
        {getClipboardButton()}
      </div>
      <InfoText
        infoMessage={infoMessage}
        errorMessage={errorMessage}
      />
    </FieldContainer>
  );
}

StandaloneTextFieldBase.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool,
  isBusy: PropTypes.bool,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.func,
};

export default StandaloneTextFieldBase;