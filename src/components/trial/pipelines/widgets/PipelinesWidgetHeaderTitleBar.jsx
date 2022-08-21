import React  from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import NavigationDropdownSelectInputBase
  from "temp-library-components/navigation/dropdown/input/NavigationDropdownSelectInputBase";

export const PIPELINE_WIDGET_HEADER_ITEMS = {
  PIPELINE: "pipeline",
  LOGS: "logs",
  METRICS: "metrics",
  MORE: "more",
};

export default function PipelinesWidgetHeaderTitleBar(
  {
    selectedPipelineId,
    setSelectedPipelineId,
    pipelines,
    dropdownMaxHeight,
  }) {
  const history = useHistory();

  const handleHeaderItemClick = (selectedOption) => {
    switch (selectedOption) {
      case PIPELINE_WIDGET_HEADER_ITEMS.PIPELINE:
      case PIPELINE_WIDGET_HEADER_ITEMS.LOGS:
      case PIPELINE_WIDGET_HEADER_ITEMS.METRICS:
      case PIPELINE_WIDGET_HEADER_ITEMS.MORE:
        default:
          history.push(`/workflow/details/${selectedPipelineId}/summary`);
    }
  };

  const getLinkBar = () => {
    if (isMongoDbId(selectedPipelineId) === true) {
      return (
        <div className={"d-flex"}>
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
  };

  const getSelectedPipelineName = () => {
    if (isMongoDbId(selectedPipelineId) === true) {
      if (Array.isArray(pipelines) && pipelines.length > 0) {
        const foundPipeline = pipelines?.find((pipeline) => pipeline?._id === selectedPipelineId);

        if (foundPipeline) {
          return foundPipeline?.name;
        }
      }

      return selectedPipelineId;
    }

    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      return "No Pipelines Found";
    }

    return "Select a Pipeline";
  };

  return (
    <div className={"d-flex"}>
      <NavigationDropdownSelectInputBase
        selectedOption={selectedPipelineId}
        selectOptions={pipelines}
        setDataFunction={setSelectedPipelineId}
        title={getSelectedPipelineName()}
        textField={"name"}
        valueField={"_id"}
        dropdownBodyMaxHeight={dropdownMaxHeight}
      />
      {getLinkBar()}
    </div>
  );
}

PipelinesWidgetHeaderTitleBar.propTypes = {
  selectedPipelineId: PropTypes.string,
  setSelectedPipelineId: PropTypes.func,
  pipelines: PropTypes.array,
  dropdownMaxHeight: PropTypes.string,
};
