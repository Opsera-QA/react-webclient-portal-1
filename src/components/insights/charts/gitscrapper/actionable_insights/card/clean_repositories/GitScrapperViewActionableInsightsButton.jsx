import React from "react";
import PropTypes from "prop-types";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import { useHistory } from "react-router-dom";

function GitScrapperViewActionableInsightsButton({ dataObject }) {
  console.log('GitScrapperViewActionableInsightsButton dataObject', dataObject);
  const history = useHistory();

  const getActionableInsights = () => {
    console.log('getActionableInsights trigger');
    // history.push(`/blueprint/${dataObject.getData("pipelineId")}/${dataObject.getData("run_count")}`);
  };

  return (
    <div>
      <ActionBarButton
        action={() => getActionableInsights()}
        icon={faSearch}
        popoverText={`View Actionable Insights`}
      />
    </div>
  );
}

GitScrapperViewActionableInsightsButton.propTypes = {
  dataObject: PropTypes.object,
};

export default GitScrapperViewActionableInsightsButton;
