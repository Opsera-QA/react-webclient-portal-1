import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";

function MetricNotificationConfigurationCardContainer({ children, isLoading }) {
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
          Configuration
        </div>
      </Card.Title>
      <Card.Body className="py-0 px-3 h-100 small">
        {getCardBody()}
      </Card.Body>
      <Card.Footer />
    </Card>
  );
}

MetricNotificationConfigurationCardContainer.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool
};

export default MetricNotificationConfigurationCardContainer;
