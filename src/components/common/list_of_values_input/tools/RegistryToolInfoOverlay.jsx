import React, {useContext} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import ToolInfoContainer from "components/common/fields/inventory/tools/ToolInfoContainer";
import ToolsTable from "components/inventory/tools/ToolsTable";
import {faTools, faWandMagic} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import TableCardView from "components/common/table/TableCardView";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

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
  const toastContext = useContext(DialogToastContext);

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
    toastContext.clearInfoOverlayPanel();
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

  const closePanel = () => {
    toastContext.clearInfoOverlayPanel();
  };

  if (isMounted?.current !== true) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Tool Details`}
      titleIcon={faWandMagic}
      showToasts={true}
      fullWidth={true}
    >
      <div className={"p-2"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
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