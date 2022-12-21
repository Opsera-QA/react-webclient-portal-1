import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import FieldContainer from "components/common/fields/FieldContainer";

export default function MessageFieldBase(
  {
    message,
    label,
    className,
  }) {
  return (
    <FieldContainer className={className}>
      <H5FieldSubHeader subheaderText={label} />
      <div className={"p-3 text-muted message-field"}>
        <div className={"px-3"}>{message}</div>
      </div>
    </FieldContainer>
  );
}

MessageFieldBase.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
};