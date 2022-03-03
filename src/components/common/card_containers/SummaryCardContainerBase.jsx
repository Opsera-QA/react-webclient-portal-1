import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";

function SummaryCardContainerBase({ children, isLoading, title, titleIcon }) {
  const getCardTitle = () => {
    if (isLoading) {
      return (<div className="ml-1"><LoadingIcon className={"mr-1"}/>Loading {title}</div>);
    }

    return (
      <div className="w-100 mx-2">
        <div><span><IconBase icon={titleIcon} className={"mr-1"}/>{title}</span></div>
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

SummaryCardContainerBase.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool
};

export default SummaryCardContainerBase;
