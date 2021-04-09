import React from "react";
import PropTypes from "prop-types";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import {faLink} from "@fortawesome/pro-light-svg-icons";

function DetailLinkClipboardIcon({ model, className }) {
  const getFullDetailLink = () => {
    const detailViewLink = model.getDetailViewLink();
    return process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL + detailViewLink;
  };

  if (model == null || model.getDetailViewLink() == null) {
    return null;
  }

  return (
    <CopyToClipboardIconBase
      className={className}
      copyString={getFullDetailLink()}
      copyIcon={faLink}
      copyText={"Copy direct link to this " + model?.getType()}
      copiedText={"Copied direct link to clipboard!"}
    />
  );
}

DetailLinkClipboardIcon.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string,
};

export default DetailLinkClipboardIcon;