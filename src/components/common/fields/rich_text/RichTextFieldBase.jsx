import React from "react";
import InfoContainer from "components/common/containers/InfoContainer";
import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";
import RichTextInputBase from "components/common/inputs/rich_text/RichTextInputBase";
import PropTypes from "prop-types";

export default function RichTextFieldBase (
  {
    title,
    value,
    minimumHeight,
    maximumHeight,
    isLoading,
  }) {
  return (
    <InfoContainer
      titleIcon={faFileInvoice}
      titleText={title}
      minimumHeight={minimumHeight}
      maximumHeight={maximumHeight}
      isLoading={isLoading}
    >
      <RichTextInputBase
        disabled={true}
        value={value}
      />
    </InfoContainer>
  );
}

RichTextFieldBase.propTypes = {
  value: PropTypes.any,
  title: PropTypes.string,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  isLoading: PropTypes.bool,
};