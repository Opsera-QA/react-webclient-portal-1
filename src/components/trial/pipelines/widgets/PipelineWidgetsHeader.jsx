import React  from "react";
import PropTypes from "prop-types";
import PipelineWidgetsPipelineSelectInput
  from "components/trial/pipelines/widgets/PipelineWidgetsPipelineSelectInput";
import { Link } from "react-router-dom";

function PipelineWidgetsHeader(
  {
    selectedPipelineId,
    setSelectedPipelineId,
  }) {
  return (
    <div className={"d-flex"}>
      <PipelineWidgetsPipelineSelectInput
        selectedPipelineId={selectedPipelineId}
        setSelectedPipelineId={setSelectedPipelineId}
      />
      <div className={"ml-5 my-auto"}>
        <Link to={`/workflow/details/${selectedPipelineId}/summary`}>
          {/*<IconBase icon={faCompassDrafting} className={"mr-2"}/>*/}
          Pipeline
        </Link>
      </div>
      <div className={"ml-5 my-auto"}>
        <Link to={`/workflow/details/${selectedPipelineId}/summary`}>
          {/*<IconBase icon={faCompassDrafting} className={"mr-2"}/>*/}
          Logs
        </Link>
      </div>
      <div className={"ml-5 my-auto"}>
        <Link to={`/workflow/details/${selectedPipelineId}/summary`}>
          {/*<IconBase icon={faCompassDrafting} className={"mr-2"}/>*/}
          Metrics
        </Link>
      </div>
      <div className={"ml-5 my-auto"}>
        <Link to={`/workflow/details/${selectedPipelineId}/summary`}>
          {/*<IconBase icon={faCompassDrafting} className={"mr-2"}/>*/}
          More...
        </Link>
      </div>
    </div>
  );
}

PipelineWidgetsHeader.propTypes = {
  selectedPipelineId: PropTypes.string,
  setSelectedPipelineId: PropTypes.func,
};

export default PipelineWidgetsHeader;
