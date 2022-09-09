import React, {useContext} from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewToolIdentifierOverlay from "components/admin/tools/identifiers/NewToolIdentifierOverlay";
import ToolIdentifierTable from "components/admin/tools/identifiers/ToolIdentifierTable";
import ToolIdentifierCardView from "components/admin/tools/identifiers/ToolIdentifierCardView";
import toolIdentifierMetadata from "components/admin/tools/identifiers/toolIdentifier.metadata";
import { useHistory } from "react-router-dom";

function ToolIdentifierTableCardView(
  {
    toolIdentifierFilterModel,
    setToolIdentifierFilterModel,
    isLoading,
    loadData,
    toolIdentifiers,
    isMounted, taskMetadata
  }) {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);

  const onClickFunction = (toolIdentifierModel) => {
    history.push(`/admin/tools/identifiers/details/${toolIdentifierModel?.getMongoDbId()}`);
  };

  const getCardView = () => {
    return (
      <ToolIdentifierCardView
        toolIdentifierMetadata={toolIdentifierMetadata}
        toolIdentifiers={toolIdentifiers}
        isLoading={isLoading}
        loadData={loadData}
        onClickFunction={onClickFunction}
        tooltip={"Click to view Tool Identifier Details"}
      />
    );
  };

  const getTableView = () => {
    return (
      <ToolIdentifierTable
        toolIdentifiers={toolIdentifiers}
        isLoading={isLoading}
      />
    );
  };


  const getTableCardView = () => {
    return (
      <TableCardView
        filterModel={toolIdentifierFilterModel}
        data={toolIdentifiers}
        isLoading={isLoading}
        cardView={getCardView()}
        tableView={getTableView()}
      />
    );
  };


  const createToolIdentifier = () => {
    toastContext.showOverlayPanel(<NewToolIdentifierOverlay loadData={loadData} isMounted={isMounted} />);
  };

  return (
      <FilterContainer
        loadData={loadData}
        addRecordFunction={createToolIdentifier}
        filterDto={toolIdentifierFilterModel}
        setFilterDto={setToolIdentifierFilterModel}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={taskMetadata}
        body={getTableCardView()}
        titleIcon={faTools}
        title={"Tool Identifiers"}
        type={"Tool Identifier"}
        className="px-2 pb-2"
      />
  );
}

ToolIdentifierTableCardView.propTypes = {
  toolIdentifiers: PropTypes.array,
  isLoading: PropTypes.bool,
  toolIdentifierFilterModel: PropTypes.object,
  setToolIdentifierFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  taskMetadata: PropTypes.object,
};

export default ToolIdentifierTableCardView;