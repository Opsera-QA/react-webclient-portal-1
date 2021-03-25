import React, { useMemo, useContext} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import usersTagsMetadata from "./tagging-users-metadata";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
} from "../../../common/table/table-column-helpers";
import { useHistory } from "react-router-dom";
import NewUsersMappingOverlay from "./NewUsersMappingOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";

function UsersTagTable({ data, loadData, isLoading, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = usersTagsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "tool_identifier";
        })
      ),
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "opsera_user_email";
        })
      ),
      getTableTextColumn(
        fields.find((field) => {
          return field.id === "tool_user_prop";
        })
      ),
      getTableBooleanIconColumn(
        fields.find((field) => {
          return field.id === "active";
        })
      ),
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

  return (
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
        onRowSelect={selectedRow}
        isLoading={isLoading}
        tableTitle={"User Mapping"}
        type={"User Mapping"}
        createNewRecord={createToolType}
      />
  );
}

UsersTagTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default UsersTagTable;
