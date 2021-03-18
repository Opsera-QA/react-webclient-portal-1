import React  from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import CustomBadge from "components/common/badges/CustomBadge";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function CustomLinkBadgeBase({openInNewWindow, icon, badgeText, link, className, tooltipText}) {
  let history = useHistory();

  const handleRoute = () => {
    if (openInNewWindow) {
      window.open(link);
    }
    else {
      history.push(link);
    }
  };

  if (link == null || link === "") {
    return null;
  }

  return (
    <TooltipWrapper innerText={tooltipText} placement={"left"}>
      <div className={"pointer"} onClick={() => handleRoute()}>
        <CustomBadge className={className} icon={icon} badgeText={badgeText} />
      </div>
    </TooltipWrapper>
  );
}

CustomLinkBadgeBase.propTypes = {
  link: PropTypes.string,
  openInNewWindow: PropTypes.bool,
  icon: PropTypes.object,
  badgeText: PropTypes.string,
  className: PropTypes.string,
  tooltipText: PropTypes.string
};

export default React.memo(CustomLinkBadgeBase);