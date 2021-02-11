import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableButtonColumn,
  getTableDateColumn, getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {accessTokenMetadata} from "components/user/user_settings/access_tokens/access-token-metadata";
import tokenActions from "components/user/user_settings/access_tokens/token-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {useHistory} from "react-router-dom";
import ExpireTokenModal from "components/user/user_settings/access_tokens/ExpireTokenModal";

function AccessTokenTable({data, loadData, isMounted, isLoading, cancelTokenSource}) {
  let fields = accessTokenMetadata.fields;
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken} = useContext(AuthContext);
  const [showExpireModal, setShowExpireModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(undefined);

  const toggleDeleteModal = (dataObject) => {
    setSelectedToken(dataObject);
    setShowExpireModal(true);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "scope")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableDateTimeColumn(getField(fields, "expiration")),
      getTableButtonColumn("", "danger", "Expire", toggleDeleteModal)
    ],
    []
  );

  const noDataMessage = "No access tokens have been generated.";

  const expireToken = async (token) => {
    try {
      let response = await tokenActions.expireToken(getAccessToken, cancelTokenSource, token?._id);

      if (isMounted?.current === true && response?.error == null) {
        toastContext.showDeleteSuccessResultDialog("Access Token");
        setShowExpireModal(false);
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

  const onRowSelect = (rowData, type) => {
    history.push(`/user/accessTokens/details/${rowData.original._id}`);
  };

  return (
    <div className="px-2 pb-2">
      <CustomTable
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        tableTitle={"Access Tokens"}
        type={"Access Token"}
      />
      <ExpireTokenModal showModal={showExpireModal} setShowModal={setShowExpireModal} expireToken={expireToken} />
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