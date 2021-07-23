import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExternalLink} from "@fortawesome/pro-light-svg-icons";

function ExternalPageLink({link, linkText, className}) {
  return (
    <div className={className}>
      <div className={"pointer"} onClick={() => window.open(link)}>
        <FontAwesomeIcon icon={faExternalLink} fixedWidth className="mr-2"/>
        {linkText}
      </div>
    </div>
  );
}

ExternalPageLink.propTypes = {
  linkText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ExternalPageLink;