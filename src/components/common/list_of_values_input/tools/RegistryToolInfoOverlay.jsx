import React from "react";
import PropTypes from "prop-types";
import InfoOverlayContainer from "components/common/inputs/info_text/InfoOverlayContainer";
import {Link} from "react-router-dom";
import ToolInfoContainer from "components/common/fields/inventory/tools/ToolInfoContainer";
import ToolsTable from "components/inventory/tools/ToolsTable";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import TableCardView from "components/common/table/TableCardView";

function RegistryToolInfoOverlay(
  {
    tools,
    fieldName,
    toolMetadata,
    isMounted,
    loadData,
    isLoading,
    selectedToolId,
    setDataFunction,
    model,
    setModel,
  }) {
  // TODO: This is a workaround until the tool info overlay is complete
  const rowClickFunction = (selectedTool) => {
    if (setDataFunction) {
      setDataFunction(fieldName, selectedTool);
    } else {
      if (setModel != null) {
        model?.setData(fieldName, selectedTool?._id);
        setModel({...model});
      }
    }
    document.body.click();
  };

  const getToolsTable = () => {
    return (
      <ToolsTable
        loadData={loadData}
        isMounted={isMounted}
        data={tools}
        toolMetadata={toolMetadata}
        isLoading={isLoading}
        rowClickFunction={rowClickFunction}
      />
    );
  };

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
            <TableCardView
              data={tools}
              tableView={getToolsTable()}
              isLoading={isLoading}
            />
          }
          title={"Tools"}
        />
      </div>
    );
  };

  if (isMounted?.current !== true) {
    return null;
  }

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
  isMounted: PropTypes.object,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default RegistryToolInfoOverlay;