import React from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";

export function ExternalLink(
  {
    label,
    link,
    className,
  }) {
  const classNames = hasStringValue(className) === true ? `${className} externalLink` : "externalLink";

  return (
    <a
      href={link}
      className={classNames}
      rel={"noreferrer"}
      target={"_blank"}
    >
      {label}
    </a>
  );
}

ExternalLink.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};