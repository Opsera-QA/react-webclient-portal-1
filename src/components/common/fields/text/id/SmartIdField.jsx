import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";
import DetailLinkClipboardIcon from "components/common/icons/link/DetailLinkClipboardIcon";

function SmartIdField({model, fieldName, className, showClipboardButton, showDetailLinkClipboardIcon }) {
  const [field] = useState(model.getFieldById(fieldName));

  const getClipboardButton = () => {
    if (showClipboardButton !== false) {
      return (<CopyToClipboardIcon className={"my-auto ml-3"} copyString={model?.getData(fieldName)} />);
    }
  };

  const getDetailLinkClipboardButton = () => {
    if (showDetailLinkClipboardIcon !== false) {
      return (<DetailLinkClipboardIcon className={"my-auto ml-3"} model={model} />);
    }
  };

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field}/>
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
  showDetailLinkClipboardIcon: PropTypes.bool
};

SmartIdField.defaultProps = {
  fieldName: "_id"
};

export default SmartIdField;