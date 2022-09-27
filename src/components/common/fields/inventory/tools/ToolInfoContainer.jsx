import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import ToolReadOnlyDetailPanel from "components/inventory/tools/details/read_only_panel/ToolReadOnlyDetailPanel";
import LoadingDialog from "components/common/status_notifications/loading";
import {Link} from "react-router-dom";
import useGetRegistryToolModelById from "components/inventory/tools/hooks/useGetRegistryToolModelById";

function ToolInfoContainer({ toolId }) {
  const {
    toolModel,
    isLoading,
  } = useGetRegistryToolModelById(toolId);

  const getInfoText = () => {
    if (toolModel) {
      return (
        <div className="text-muted mb-2">
          Configuration details for this item are listed below. Tool and account specific settings are stored in the
          <span> <Link to="/inventory/tools" target="_blank" rel="noopener noreferrer">Tool Registry</Link></span>.
          <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
          <div>
            <Link to={`/inventory/tools/details/${toolId}`} target="_blank" rel="noopener noreferrer">
              Click here to visit the selected Tool&apos;s Registry entry
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="text-muted mb-2">
        The selected Tool was not found when pulling available tools. Its Access Rules may have changed or it may have been deleted.
        <span> <Link to="/inventory/tools" target="_blank" rel="noopener noreferrer">Tool Registry</Link></span>.
        <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
      </div>
    );
  };

  const getBody = () => {
    if (toolModel) {
      return (
        <ToolReadOnlyDetailPanel
          toolModel={toolModel}
        />
      );
    }
  };

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading Tool Data"}
      />
    );
  }

  return (
    <div>
      {getInfoText()}
      <InfoContainer
        titleIcon={faTools}
        titleText={`${toolModel?.getData("name")}`}
      >
        {getBody()}
      </InfoContainer>
    </div>
  );
}

ToolInfoContainer.propTypes = {
  toolId: PropTypes.string,
};

export default ToolInfoContainer;