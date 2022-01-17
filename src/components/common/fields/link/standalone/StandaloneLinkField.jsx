import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";
import {useHistory} from "react-router-dom";
import InfoText from "components/common/inputs/info_text/InfoText";

function StandaloneLinkField(
  {
    link,
    label,
    className,
    openInNewWindow,
    showClipboardButton,
    formText,
  }) {
  let history = useHistory();

  const openLink = () => {
    if (openInNewWindow) {
      window.open(link);
    }
    else {
      history.push(link);
    }
  };

  const getLink = () => {
    if (link != null && link !== "") {
      return <span className={"pointer link-text"} onClick={() => openLink()}>{link}</span>;
    }
  };

  const getClipboardButton = () => {
    if (showClipboardButton === true) {
      return (<CopyToClipboardIcon className={"my-auto ml-3"} copyString={link} />);
    }
  };

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <label className="mb-0 mr-2 text-muted"><span>{label}:</span></label>
        {getLink()}
        {getClipboardButton()}
      </div>
      <InfoText customMessage={formText} />
    </FieldContainer>
  );
}

StandaloneLinkField.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
  formText: PropTypes.string,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool,
  openInNewWindow: PropTypes.bool
};

export default StandaloneLinkField;