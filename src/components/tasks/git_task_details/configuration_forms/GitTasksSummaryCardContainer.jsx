import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import {faTasksAlt} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function GitTasksSummaryCardContainer({ children, isLoading }) {
  const getCardBody = () => {
    if (isLoading) {
      return (<div className="m-3" />);
    }

    return children;
  };

  return (
    <Card className="mb-2 pipeline-summary-card">
      <Card.Title>
        <div className="d-flex pipeline-card-title small p-1 w-100">
          <div className={"mx-2"}><span><IconBase isLoading={isLoading} icon={faTasksAlt} fixedWidth className={"mr-1"} />Task Details</span></div>
        </div>
      </Card.Title>
      <Card.Body className="py-0 px-3 h-100 small">
        {getCardBody()}
      </Card.Body>
      <Card.Footer />
    </Card>
  );
}

GitTasksSummaryCardContainer.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool
};

export default GitTasksSummaryCardContainer;
