import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import {Card} from "react-bootstrap";
import PipelineTypesField from "../../../../common/form_fields/pipelines/PipelineTypesField";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-solid-svg-icons";

function PipelineSummaryCardContainer({ children, isLoading, pipelineData }) {
  const getCardTitle = () => {
    if (isLoading) {
      return (<div className="ml-1"><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Pipelines</div>);
    }

    return (
      <div className="d-flex justify-content-between w-100 mx-2">
        <div><span>{pipelineData.getData("name")}</span></div>
        <div className="ml-auto">
          <PipelineTypesField dataObject={pipelineData}/>
        </div>
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

PipelineSummaryCardContainer.propTypes = {
  children: PropTypes.any,
  pipelineData: PropTypes.object,
  isLoading: PropTypes.bool
};


export default PipelineSummaryCardContainer;
