import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";
import {useHistory} from "react-router-dom";

function StandaloneLinkField({link, label, className, openInNewWindow}) {
  let history = useHistory();

  const openLink = () => {
    if (openInNewWindow) {
      window.open(link);
    }
    else {
      history.push(link);
    }
  };

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <label className="mb-0 mr-2 text-muted"><span>{label}:</span></label>
        <span className={"pointer link-text"} onClick={() => openLink()}>{link}</span>
        <CopyToClipboardIcon className={"my-auto ml-auto"} copyString={link} />
      </div>
    </FieldContainer>
  );
}

StandaloneLinkField.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  openInNewWindow: PropTypes.bool
};

export default StandaloneLinkField;