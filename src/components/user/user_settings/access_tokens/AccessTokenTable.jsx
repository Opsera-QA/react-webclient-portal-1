import React, {useContext, useMemo, useState} from "react";
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
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";

function AccessTokenTable({data, loadData, isMounted, isLoading, cancelTokenSource}) {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
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

  const deleteToken = async () => {
    try {
      let response = await tokenActions.expireToken(getAccessToken, cancelTokenSource, selectedToken?._id);

      console.log("response: " + JSON.stringify(response));

      if (isMounted?.current === true && response?.error == null) {
        toastContext.showDeleteSuccessResultDialog("Access Token");
        setShowDeleteModal(false);
        loadData(cancelTokenSource);
      }
      else if (isMounted?.current === true)
      {
        toastContext.showDeleteFailureResultDialog("Access Token", response?.error);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showDeleteFailureResultDialog("Access Token");
        console.error(error);
      }
    }
  }

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
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  cancelTokenSource: PropTypes.object,
};

export default AccessTokenTable;