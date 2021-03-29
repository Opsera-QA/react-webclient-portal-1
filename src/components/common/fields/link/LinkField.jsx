import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";
import {useHistory} from "react-router-dom";

function LinkField({dataObject, fieldName, className, showClipboardButton, openInNewWindow }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  let history = useHistory();

  const openLink = () => {
    if (openInNewWindow) {
      window.open(dataObject.getData(fieldName));
    }
    else {
      history.push(dataObject.getData(fieldName));
    }
  };


  const getClipboardButton = () => {
    if (showClipboardButton === true) {
      return (<CopyToClipboardIcon className={"my-auto ml-auto"} copyString={dataObject?.getData(fieldName)} />);
    }
  };

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field}/>
        <span className={"pointer link-text"} onClick={() => openLink()}>{dataObject.getData(fieldName)}</span>
        {getClipboardButton()}
      </div>
    </FieldContainer>
  );
}

LinkField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool,
  openInNewWindow: PropTypes.bool
};

export default LinkField;