import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";

function InsightsCardContainerBase({ children, isLoading, titleBar, footerBar }) {
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

  return (
    <Card className="mb-2 insights-summary-card">
      <Card.Title className="mb-0">
        <div className="insight-card-title small py-1 px-2">
          {getCardTitle()}
        </div>
      </Card.Title>
      <Card.Body className="h-100 p-0">
        {getCardBody()}
      </Card.Body>      
    </Card>
  );
}

InsightsCardContainerBase.propTypes = {
  children: PropTypes.any,
  titleBar: PropTypes.object,
  footerBar: PropTypes.object,
  isLoading: PropTypes.bool
};

export default InsightsCardContainerBase;
