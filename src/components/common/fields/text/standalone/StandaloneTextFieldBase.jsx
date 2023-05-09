import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";
import IconBase from "components/common/icons/IconBase";
import InfoText from "components/common/inputs/info_text/InfoText";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import FieldLabelBase from "components/common/fields/FieldLabelBase";

function StandaloneTextFieldBase(
  {
    label,
    text,
    className,
    showClipboardButton,
    isBusy,
    infoMessage,
    errorMessage,
    visible,
  }) {
  if (visible === false) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className={"w-100 d-flex"}>
        <FieldLabelBase
          label={label}
          // isLoading={isBusy}
        />
        <span><IconBase className={"mr-2"} isLoading={isBusy} />{text}</span>
        <CopyToClipboardIconBase
          className={"my-auto ml-2"}
          copyString={text}
          visible={showClipboardButton === true}
        />
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
  visible: PropTypes.bool,
};

export default StandaloneTextFieldBase;