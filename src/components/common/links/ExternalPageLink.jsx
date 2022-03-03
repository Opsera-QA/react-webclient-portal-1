import React  from "react";
import PropTypes from "prop-types";
import {faExternalLink} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function ExternalPageLink({link, linkText, className}) {
  return (
    <div className={className}>
      <div className={"pointer"} onClick={() => window.open(link)}>
        <IconBase icon={faExternalLink} className={"mr-2"}/>
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