import React from "react";
import PropTypes from "prop-types";
import { faSearchPlus } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import { useHistory } from "react-router-dom";

function GitScrapperViewActionableInsightsButton({ dataObject }) {

  const history = useHistory();

  const getActionableInsights = () => {
    console.log('getActionableInsights trigger');
    // history.push(`/blueprint/${dataObject.getData("pipelineId")}/${dataObject.getData("run_count")}`);
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

GitScrapperViewActionableInsightsButton.propTypes = {
  dataObject: PropTypes.object,
};

export default GitScrapperViewActionableInsightsButton;
