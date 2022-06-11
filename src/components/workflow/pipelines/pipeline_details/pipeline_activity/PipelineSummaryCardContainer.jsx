import React from "react";
import PropTypes from "prop-types";
import PipelineSubscriptionIcon from "components/common/icons/subscription/PipelineSubscriptionIcon";
import CardContainerBase from "components/common/card_containers/CardContainerBase";
import PipelineTypeIcon from "components/common/fields/pipelines/types/PipelineTypeIcon";
import LoadingIcon from "components/common/icons/LoadingIcon";

function PipelineSummaryCardContainer({ children, isLoading, pipelineData, subscribedPipelineIds }) {
  const getTitleBar = () => {
    if (isLoading) {
      return (<div><LoadingIcon className={"mr-2"}/>Loading Pipelines</div>);
    }

    return (
      <div className="d-flex justify-content-between w-100">
        <div className={"d-flex"}>
          <PipelineTypeIcon model={pipelineData} className={"mr-2"} />
          <span>{pipelineData.getData("name")}</span>
        </div>
        <div className={"d-flex ml-auto"}>
          <PipelineSubscriptionIcon
            pipelineId={pipelineData?.getData("_id")}
            className={"m1-2"}
            pipelineModel={pipelineData}
            subscribedPipelineIds={subscribedPipelineIds}
          />
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
  isLoading: PropTypes.bool,
  subscribedPipelineIds: PropTypes.array,
};


export default PipelineSummaryCardContainer;
