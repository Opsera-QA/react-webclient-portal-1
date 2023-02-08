import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import FieldContainer from "components/common/fields/FieldContainer";
import IconBase from "components/common/icons/IconBase";

export default function MessageFieldBase(
  {
    message,
    messageFieldClassName,
    icon,
    label,
    className,
  }) {
  return (
    <FieldContainer className={className}>
      <H5FieldSubHeader subheaderText={label} />
      <div className={`p-3 message-field ${messageFieldClassName}`}>
        <div className={"px-3 d-flex"}>
          <IconBase iconSize={"lg"} icon={icon} className={"mr-2"} />
          {message}
        </div>
      </div>
    </FieldContainer>
  );
}

MessageFieldBase.propTypes = {
  message: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  label: PropTypes.string,
  messageFieldClassName: PropTypes.string,
};

MessageFieldBase.defaultProps = {
  messageFieldClassName: "info-message-field",
};
