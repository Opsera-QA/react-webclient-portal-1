import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/pro-solid-svg-icons";
import PipelineSubscriptionIcon from "components/common/icons/subscription/PipelineSubscriptionIcon";
import CardContainerBase from "components/common/card_containers/CardContainerBase";
import PipelineTypesField from "components/common/fields/pipelines/PipelineTypesField";

function PipelineSummaryCardContainer({ children, isLoading, pipelineData }) {
  const getTitleBar = () => {
    if (isLoading) {
      return (<div className="ml-1"><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Pipelines</div>);
    }

    return (
      <div className="d-flex justify-content-between w-100">
        <div><span>{pipelineData.getData("name")}</span></div>
        <div className="d-flex ml-auto">
          <PipelineSubscriptionIcon pipelineId={pipelineData?._id} className={"mr-1"}/>
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
    <CardContainerBase titleBar={getTitleBar()} isLoading={isLoading}>
      <div className={"px-2"}>
        {getCardBody()}
      </div>
    </CardContainerBase>
  );
}

PipelineSummaryCardContainer.propTypes = {
  children: PropTypes.any,
  pipelineData: PropTypes.object,
  isLoading: PropTypes.bool
};


export default PipelineSummaryCardContainer;
