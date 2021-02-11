import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateColumn, getTableDateTimeColumn, getTableDeleteColumn, getTableInfoIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {accessTokenMetadata} from "components/user/user_settings/access_tokens/access-token-metadata";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";
import DestructiveDeleteModal from "components/common/modal/DestructiveDeleteModal";

function AccessTokenTable({data, loadData, isLoading}) {
  let fields = accessTokenMetadata.fields;
  const [showActivityLogsModal, setShowActivityLogsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(undefined);

  const showTokenLogs = (dataObject) => {
    setSelectedToken(dataObject);
    setShowActivityLogsModal(true);
  };

  const toggleDeleteModal = (dataObject) => {
    setSelectedToken(dataObject);
    setShowDeleteModal(true);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "scope")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableDateTimeColumn(getField(fields, "expiration")),
      getTableInfoIconColumn(showTokenLogs),
      getTableDeleteColumn(toggleDeleteModal)
    ],
    []
  );

  const noDataMessage = "No access tokens have been generated.";

  const deleteToken = () => {
    console.log("deleting token: ")
  };

  return (
    <div className="px-2 pb-2">
      <CustomTable
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        isLoading={isLoading}
        tableTitle={"Access Tokens"}
        type={"Access Token"}
      />
      <ModalActivityLogsDialog size={"sm"} header={"Token"} show={showActivityLogsModal} setParentVisibility={setShowActivityLogsModal} jsonData={selectedToken} />
      <DestructiveDeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} deleteTopic={"Access Token"} handleDelete={deleteToken} />
    </div>
  );
}

AccessTokenTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default AccessTokenTable;