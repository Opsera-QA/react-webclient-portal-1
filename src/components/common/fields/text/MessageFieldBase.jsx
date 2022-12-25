import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import FieldContainer from "components/common/fields/FieldContainer";
import IconBase from "components/common/icons/IconBase";

export default function MessageFieldBase(
  {
    message,
    icon,
    label,
    className,
  }) {
  return (
    <FieldContainer className={className}>
      <H5FieldSubHeader subheaderText={label} />
      <div className={"p-3 text-muted message-field"}>
        <div className={"px-3 d-flex"}><IconBase icon={icon} className={"mr-2"} />{message}</div>
      </div>
    </FieldContainer>
  );
}

MessageFieldBase.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.object,
  label: PropTypes.string,
};