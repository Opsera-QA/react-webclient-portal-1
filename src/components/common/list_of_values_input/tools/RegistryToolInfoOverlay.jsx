import React from "react";
import PropTypes from "prop-types";
import InfoOverlayContainer from "components/common/inputs/info_text/InfoOverlayContainer";
import {Link} from "react-router-dom";
import ToolInfoContainer from "components/common/fields/inventory/tools/ToolInfoContainer";
import ToolsTable from "components/inventory/tools/ToolsTable";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";

function RegistryToolInfoOverlay({tools, toolMetadata, loadData, isLoading, selectedToolId}) {
  const getBody = () => {
    if (selectedToolId) {
      return (
        <ToolInfoContainer
          toolId={selectedToolId}
        />
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
          body={
            <ToolsTable
              data={tools}
              toolMetadata={toolMetadata}
            />
          }
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
  tools: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  selectedToolId: PropTypes.string,
  toolMetadata: PropTypes.object,
};

export default RegistryToolInfoOverlay;