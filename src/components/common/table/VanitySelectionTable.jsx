import React, {useContext} from "react";
import PropTypes from "prop-types";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";
import VanitySelectionTableBase from "components/common/table/VanitySelectionTableBase";
import {persistUpdatedRecord} from "components/common/buttons/saving/saving-helpers-v2";
import {DialogToastContext} from "contexts/DialogToastContext";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";

function VanitySelectionTable(
  {
    columns,
    parentModel,
    setParentModel,
    loadData,
    data,
    noDataMessage,
    rowStyling,
    isLoading,
    sort,
    paginationModel,
    tableHeight,
    rowSelection,
  }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = async (model, grid, row) => {
    // Don't change rows if invalid, save before changing rows if valid
    if (model != null) {
      // We are still on same row
      if (model?.getData("_id") === row?.getData("_id")) {
        return true;
      }

      // TODO: Show save confirmation. If true, run save and on success change rows. On failure return false;
      // toastContext.showModal(
      //   <UnsavedChangesModal
      //     model={selectedModel}
      //     errors={fieldErrors}
      //     handleContinueEditing={handleContinueEditing}
      //     handleRevert={handleRevert}
      //   />
      // );

      if (model?.isChanged()) {
        const response = await persistUpdatedRecord(model, toastContext);

        if (response === false) {
          return false;
        }
      }
    }

    row?.setSetStateFunction(setParentModel);
    setParentModel({...row});
    return true;
  };

  const handleContinueEditing = () => {
    toastContext.clearOverlayPanel();
  };

  const handleRevert = (selectedModel) => {
    toastContext.clearOverlayPanel();
    selectedModel?.resetData();
    setParentModel({...selectedModel});
  };

  const getTableBody = () => {
    return (
      <VanityPaginationContainer loadData={loadData} isLoading={isLoading} paginationModel={paginationModel}>
        <VanitySelectionTableBase
          selectedId={parentModel?.getData("_id")}
          selectedModel={parentModel}
          rowSelection={rowSelection}
          noDataMessage={noDataMessage}
          data={data}
          isLoading={isLoading}
          columns={columns}
          onRowSelect={onRowSelect}
          rowStyling={rowStyling}
          height={tableHeight}
          sort={sort}
        />
      </VanityPaginationContainer>
    );
  };

  return (
    <TableBodyLoadingWrapper
      isLoading={isLoading || columns == null}
      data={data}
      noDataMessage={noDataMessage}
      tableComponent={getTableBody()}
      tableHeight={tableHeight}
    />
  );
}

VanitySelectionTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  rowStyling: PropTypes.func,
  isLoading: PropTypes.bool,
  sort: PropTypes.string,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  tableHeight: PropTypes.string,
  setParentModel: PropTypes.func,
  parentModel: PropTypes.object,
  rowSelection: PropTypes.string
};

VanitySelectionTable.defaultProps = {
  rowSelection: "row"
};

export default VanitySelectionTable;