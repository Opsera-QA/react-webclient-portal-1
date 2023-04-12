import React  from "react";
import PropTypes from "prop-types";
import {faExternalLink} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

export default function ExternalPageLink(
  {
    link,
    linkText,
    icon,
    className,
    tooltip,
    tooltipPlacement,
  }) {


  return (
    <TooltipWrapper
      innerText={tooltip}
      placement={tooltipPlacement}
    >
      <div className={className}>
        <div className={"pointer"} onClick={() => window.open(link)}>
          <IconBase icon={icon} className={"mr-2"}/>
          {linkText}
        </div>
      </div>
    </TooltipWrapper>
  );
}

ExternalPageLink.propTypes = {
  linkText: PropTypes.string,
  link: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.object,
  tooltip: PropTypes.any,
  tooltipPlacement: PropTypes.string,
};

ExternalPageLink.defaultProps = {
  icon: faExternalLink,
};
