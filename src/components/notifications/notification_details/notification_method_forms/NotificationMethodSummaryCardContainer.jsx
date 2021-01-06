import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faSpinner} from "@fortawesome/pro-light-svg-icons";

function NotificationMethodSummaryCardContainer({ children, isLoading, notificationData }) {
  const getCardTitle = () => {
    if (isLoading) {
      return (<div className="ml-1"><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Notification Method</div>);
    }

    return (
      <div className="w-100 mx-2">
        <div><span><FontAwesomeIcon icon={faEnvelope} fixedWidth className="mr-1"/>Notification Method: {notificationData.getData("method")}</span></div>
      </div>
    );
  };

  const getCardBody = () => {
    if (isLoading) {
      return (<div className="m-3" />);
    }

    return children;
  };

  return (
    <Card className="mb-2 pipeline-summary-card">
      <Card.Title>
        <div className="d-flex pipeline-card-title small p-1">
          {getCardTitle()}
        </div>
      </Card.Title>
      <Card.Body className="py-0 px-3 h-100 small">
        {getCardBody()}
      </Card.Body>
      <Card.Footer />
    </Card>
  );
}

NotificationMethodSummaryCardContainer.propTypes = {
  children: PropTypes.any,
  notificationData: PropTypes.object,
  isLoading: PropTypes.bool
};

export default NotificationMethodSummaryCardContainer;
