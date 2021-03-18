import React  from "react";
import PropTypes from "prop-types";
import CustomLinkBadgeBase from "components/common/badges/CustomLinkBadgeBase";

function CustomModelLinkBadge({dataModel, openInNewWindow, icon, badgeText, className}) {
  if (dataModel == null) {
    return null;
  }

  return (
    <CustomLinkBadgeBase
      className={className}
      badgeText={badgeText}
      icon={icon}
      link={dataModel?.getDetailViewLink()}
      openInNewWindow={openInNewWindow}
      tooltipText={`Click to view ${dataModel.getType()}`}
    />
  );
}

CustomModelLinkBadge.propTypes = {
  dataModel: PropTypes.object,
  openInNewWindow: PropTypes.bool,
  icon: PropTypes.object,
  badgeText: PropTypes.string,
  className: PropTypes.string
};

export default React.memo(CustomModelLinkBadge);