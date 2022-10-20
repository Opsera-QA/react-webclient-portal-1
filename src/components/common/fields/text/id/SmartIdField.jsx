import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import DetailLinkClipboardIcon from "components/common/icons/link/DetailLinkClipboardIcon";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";

function SmartIdField(
  {
    model,
    fieldName,
    className,
    showClipboardButton,
    showDetailLinkClipboardIcon,
    showLabel,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));

  const getClipboardButton = () => {
    if (showClipboardButton !== false) {
      return (<CopyToClipboardIconBase className={"my-auto ml-3"} copyString={model?.getData(fieldName)} />);
    }
  };

  const getDetailLinkClipboardButton = () => {
    if (showDetailLinkClipboardIcon !== false) {
      return (<DetailLinkClipboardIcon className={"my-auto ml-3"} model={model} />);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field} showLabel={showLabel}/>
        <span>{model.getData(fieldName)}</span>
        {getClipboardButton()}
        {getDetailLinkClipboardButton()}
      </div>
    </FieldContainer>
  );
}

SmartIdField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool,
  showDetailLinkClipboardIcon: PropTypes.bool,
  showLabel: PropTypes.bool,
};

SmartIdField.defaultProps = {
  fieldName: "_id"
};

export default SmartIdField;