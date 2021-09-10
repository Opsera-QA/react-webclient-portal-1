import React from "react";
import PropTypes from "prop-types";
import InfoOverlayContainer from "components/common/inputs/info_text/InfoOverlayContainer";
import {Link} from "react-router-dom";
import ToolInfoContainer from "components/common/fields/inventory/tools/ToolInfoContainer";
import ToolsTable from "components/inventory/tools/ToolsTable";
import toolMetadata from "components/inventory/tools/tool-metadata";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";

// TODO: Rework to use Summary panel for both the main tool view and also the configuration based off tool identifier like in the registry
function RegistryToolInfoOverlay({tools, toolData, loadData, isLoading, selectedToolId}) {
  const getBody = () => {
    if (toolData) {
      return (
        <>
          <div className="text-muted mb-2">
            Configuration details for this item are listed below. Tool and account specific settings are stored in the
            <span> <Link to="/inventory/tools" target="_blank" rel="noopener noreferrer">Tool Registry</Link></span>.
            <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
            <div><Link to={`/inventory/tools/details/${selectedToolId}`} target="_blank" rel="noopener noreferrer">Click here to view the selected Tool&apos;s details</Link></div>
          </div>
          <ToolInfoContainer toolId={selectedToolId} />
        </>
      );
    }

    if (selectedToolId != null && selectedToolId !== "") {
      return (
        <div className="text-muted mb-2">
          The selected Tool was not found when pulling available tools. Its Access Rules may have changed or it may have been deleted.
          <span> <Link to="/inventory/tools" target="_blank" rel="noopener noreferrer">Tool Registry</Link></span>.
          <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
        </div>
      );
    }

    return (
      <div>
        <div className={"text-muted mb-2"}>
          Please select any Tool to get the details. Tool specific settings are stored in the
          <span> <Link to="/inventory/tools" target="_blank" rel="noopener noreferrer">Tool Registry</Link></span>.
          <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
        </div>
        <FilterContainer
          isLoading={isLoading}
          metadata={toolMetadata}
          loadData={loadData}
          titleIcon={faTools}
          body={<ToolsTable data={tools} />}
          title={"Tools"}
        />
      </div>
    );
  };

  return (
    <InfoOverlayContainer title={"Tool Details"}>
      {getBody()}
    </InfoOverlayContainer>
  );
}

RegistryToolInfoOverlay.propTypes = {
  toolData: PropTypes.object,
  tools: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  selectedToolId: PropTypes.string,
};

export default RegistryToolInfoOverlay;