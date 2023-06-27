import React, {useContext} from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import NewToolIdentifierOverlay from "components/admin/tools/identifiers/NewToolIdentifierOverlay";
import ToolIdentifierTable from "components/admin/tools/identifiers/ToolIdentifierTable";
import ToolIdentifierCardView from "components/admin/tools/identifiers/ToolIdentifierCardView";

export default function ToolIdentifierTableCardView(
  {
    toolIdentifierFilterModel,
    setToolIdentifierFilterModel,
    isLoading,
    loadData,
    toolIdentifiers,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);

  const getCardView = () => {
    return (
      <ToolIdentifierCardView
        toolIdentifiers={toolIdentifiers}
        isLoading={isLoading}
        loadData={loadData}
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
        body={getTableCardView()}
        titleIcon={faTools}
        title={"Tool Identifiers"}
        type={"Tool Identifier"}
        className={"px-2 pb-2"}
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
};
