import React from "react";
import PropTypes from "prop-types";
import { faSearchPlus } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import { useHistory } from "react-router-dom";

function ShowActionableInsightsButton({ dataObject }) {

  const history = useHistory();

  const getActionableInsights = () => {
    history.push(`/blueprint/${dataObject.getData("pipelineId")}/${dataObject.getData("run_count")}`);
  };

  return (
    <div>
      <ActionBarButton
        action={() => getActionableInsights()}
        icon={faSearchPlus}
        popoverText={`Pipeline Blueprint`}
      />
    </div>
  );
}

ShowActionableInsightsButton.propTypes = {
  dataObject: PropTypes.object,
};

export default ShowActionableInsightsButton;
