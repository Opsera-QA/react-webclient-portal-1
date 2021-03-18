import React from "react";
import PropTypes from "prop-types";
import LinkButtonBase from "components/common/buttons/link/LinkButtonBase";

function ModelLinkButton({icon, text, size, openInNewWindow, className, variant, dataModel}) {
  if (dataModel == null || dataModel?.getDetailViewLink() == null) {
    return null;
  }

  return (
    <LinkButtonBase
      className={className}
      openInNewWindow={openInNewWindow}
      link={dataModel?.getDetailViewLink()}
      icon={icon}
      size={size}
      text={text}
      variant={variant}
    />
  );
}

ModelLinkButton.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  dataModel: PropTypes.object,
  size: PropTypes.string
};

export default React.memo(ModelLinkButton);
