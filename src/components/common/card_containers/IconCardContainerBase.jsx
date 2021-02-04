import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

function IconCardContainerBase({ children, isLoading, titleBar, footerBar, className }) {
  const getCardTitle = () => {
    if (isLoading) {
      return (<div className="ml-1"><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</div>);
    }

    return titleBar;
  };

  const getCardBody = () => {
    if (isLoading) {
      return (<div className="m-3" />);
    }

    return children;
  };

  const getCardFooter = () => {
    if (footerBar) {
      return (
        <Card.Footer>
          {footerBar}
        </Card.Footer>
      );
    }
  }

  return (
    <Card className={`mb-2 h-100 ${className}`}>
      <Card.Title className="mb-0 px-2">
        {getCardTitle()}
      </Card.Title>
      <Card.Body className="h-100 px-2 py-0">
        {getCardBody()}
      </Card.Body>
      {getCardFooter()}
    </Card>
  );
}

IconCardContainerBase.propTypes = {
  children: PropTypes.any,
  titleBar: PropTypes.object,
  footerBar: PropTypes.object,
  isLoading: PropTypes.bool
};

export default IconCardContainerBase;
