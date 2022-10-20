import React, {useContext} from "react";
import PropTypes from "prop-types";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";
import {persistUpdatedRecord} from "components/common/buttons/saving/saving-helpers-v2";
import {DialogToastContext} from "contexts/DialogToastContext";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";
import MakeupTableBase from "components/common/table/makeup/MakeupTableBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function VanitySelectionTable(
  {
    columns,
    parentModel,
    setParentModel,
    loadData,
    data,
    noDataMessage,
    rowStylingFunction,
    isLoading,
    sort,
    paginationModel,
    handleRowSelectFunction,
    tableHeight,
    rowSelection,
  }) {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = async (row) => {

    // Don't change rows if invalid, save before changing rows if valid
    if (parentModel != null) {
      // TODO: Show save confirmation. If true, run save and on success change rows. On failure return false;
      // toastContext.showModal(
      //   <UnsavedChangesModal
      //     model={selectedModel}
      //     errors={fieldErrors}
      //     handleContinueEditing={handleContinueEditing}
      //     handleRevert={handleRevert}
      //   />
      // );

      if (parentModel?.isChanged()) {
        const response = await persistUpdatedRecord(parentModel, toastContext);

        if (response === false) {
          return;
        }

        if (loadData) {
          loadData();
        }
      }
    }

    handleRowSelectFunction(row?.original);
  };

  const handleContinueEditing = () => {
    toastContext.clearOverlayPanel();
  };

  const handleRevert = (selectedModel) => {
    toastContext.clearOverlayPanel();
    selectedModel?.resetData();
    setParentModel({...selectedModel});
  };

  const getRowStyling = (row) => {
    const data = DataParsingHelper.parseObject(row?.original);

    if (rowStylingFunction) {
      return rowStylingFunction(data);
    }

    if (parentModel) {
      const newMongoDbId = DataParsingHelper.parseMongoDbId(data?._id);

      if (newMongoDbId && newMongoDbId === parentModel?.getMongoDbId()) {
        return "selected-row";
      } else {
        return "unselected-row";
      }
    }

    return "unselected-row";
  };

  const getTableBody = () => {
    return (
      <VanityPaginationContainer loadData={loadData} isLoading={isLoading} paginationModel={paginationModel}>
        <MakeupTableBase
          selectedModel={parentModel}
          rowSelection={rowSelection}
          noDataMessage={noDataMessage}
          data={data}
          isLoading={isLoading}
          columns={columns}
          onRowSelect={onRowSelect}
          rowStyling={getRowStyling}
          tableHeight={tableHeight}
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
  rowSelection: PropTypes.string,
  handleRowSelectFunction: PropTypes.func,
  rowStylingFunction: PropTypes.func,
};

VanitySelectionTable.defaultProps = {
  rowSelection: "row"
};

export default VanitySelectionTable;