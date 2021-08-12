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
function RegistryToolInfoOverlay({tools, toolData, loadData, isLoading}) {
  const getBody = () => {
    if (toolData) {
      return (
        <>
          <div className="text-muted mb-2">
            Configuration details for this item are listed below. Tool and account specific settings are stored in the
            <span> <Link to="/inventory/tools">Tool Registry</Link></span>.
            <div>To add a new entry to a dropdown or update settings, make those changes there.</div>
          </div>
          <ToolInfoContainer toolData={toolData} />
        </>
      );
    }

    return (
      <div>
        <div className={"text-muted mb-2"}>
          Please select any Tool to get the details. Tool specific settings are stored in the
          <span> <Link to="/inventory/tools">Tool Registry</Link></span>.
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
};

export default RegistryToolInfoOverlay;