import React  from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {Col} from "react-bootstrap";

function PageLink({link, linkText, icon, visible}) {
  if (visible !== true) {
    return null;
  }

  return (
    <Col xs={12} md={6} lg={4} className="p-2">
      <Link to={link}><FontAwesomeIcon icon={icon} fixedWidth className="mr-2"/>{linkText}</Link>
    </Col>
  );
}

PageLink.propTypes = {
  linkText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.object,
  visible: PropTypes.bool
};

PageLink.defaultProps = {
  visible: true
};

export default PageLink;