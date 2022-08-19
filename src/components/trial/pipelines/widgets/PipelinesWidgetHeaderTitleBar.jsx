import React  from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import NavigationDropdownSelectInputBase
  from "temp-library-components/navigation/dropdown/input/NavigationDropdownSelectInputBase";

export default function PipelinesWidgetHeaderTitleBar(
  {
    selectedPipelineId,
    setSelectedPipelineId,
    pipelines,
  }) {
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
      />
      {getLinkBar()}
    </div>
  );
}

PipelinesWidgetHeaderTitleBar.propTypes = {
  selectedPipelineId: PropTypes.string,
  setSelectedPipelineId: PropTypes.func,
  pipelines: PropTypes.array,
};
