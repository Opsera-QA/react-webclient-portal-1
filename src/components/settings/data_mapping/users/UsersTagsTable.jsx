import React, { useMemo, useContext} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import usersMappingMetadata from "components/settings/data_mapping/users/userMapping.metadata";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import { useHistory } from "react-router-dom";
import NewUsersMappingOverlay from "./NewUsersMappingOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";

function UsersTagTable({ data, loadData, isLoading, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = usersMappingMetadata.fields;

  const columns = useMemo(() => [
    getTableTextColumn(getField(fields,"tool_identifier")),
    getTableTextColumn(getField(fields,"opsera_user_email")),
    getTableTextColumn(getField(fields,"tool_user_prop")),
    getTableBooleanIconColumn(getField(fields,"active")),
  ],
  []
);

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData) => {
    history.push(`/settings/data_mapping/user_mapping/details/${rowData.original._id}`);
  };

  const noDataMessage = "No User Mappings have been configured";

  const createToolType = () => {
    toastContext.showOverlayPanel(<NewUsersMappingOverlay loadData={loadData} isMounted={isMounted} />);
  };

  const getUsersTagsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
        onRowSelect={selectedRow}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createToolType}
      supportSearch={false}
      isLoading={isLoading}
      body={getUsersTagsTable()}
      metadata={usersMappingMetadata}
      titleIcon={faTags}
      title={"User Tags"}
      type={"User Tag"}
      className={"px-2 pb-2"}
    />
  );
}

UsersTagTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object
};

export default UsersTagTable;
