import React  from "react";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import ExternalPageLink from "components/common/links/ExternalPageLink";

export default function HelpDocumentationLink(
  {
    link,
    linkText,
    icon,
    className,
    tooltip,
  }) {
  return (
    <ExternalPageLink
      link={link}
      icon={icon}
      tooltip={tooltip}
      className={className}
      linkText={linkText}
    />
  );
}

HelpDocumentationLink.propTypes = {
  linkText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.object,
  tooltip: PropTypes.any,
};

HelpDocumentationLink.defaultProps = {
  icon: faQuestionCircle,
  tooltip: "Click to view Help Documentation",
};
