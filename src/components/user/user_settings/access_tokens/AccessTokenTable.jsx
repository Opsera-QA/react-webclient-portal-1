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
import FilterContainer from "components/common/table/FilterContainer";
import {faKey, faSitemap} from "@fortawesome/pro-light-svg-icons";

function AccessTokenTable({accessTokenData, loadData, isMounted, isLoading, cancelTokenSource}) {
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

  const viewDetails = (dataObject) => {
    history.push(`/user/access-tokens/details/${dataObject?._id}`);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "scope")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableDateTimeColumn(getField(fields, "expiration")),
      getTableButtonColumn("row", "Expire Now", "danger", "Expire", toggleDeleteModal),
      getTableButtonColumn("_id", "View Details", "outline-primary", "View Details", viewDetails)
    ],
    []
  );

  const noDataMessage = "No access tokens have been generated.";

  const expireToken = async (token) => {
    try {
      await tokenActions.expireToken(getAccessToken, cancelTokenSource, token?._id);

      if (isMounted?.current === true) {
        toastContext.showDeleteSuccessResultDialog("Access Token");
        setShowExpireModal(false);
        loadData(cancelTokenSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showDeleteFailureResultDialog("Access Token");
        console.error(error);
        return false;
      }
    }
  }

  const getAccessTokensTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        isLoading={isLoading}
        data={accessTokenData}
        noDataMessage={noDataMessage}
        columns={columns}
      />
    );
  };


  return (
    <div>
      <FilterContainer
        loadData={loadData}
        isLoading={isLoading}
        body={getAccessTokensTable()}
        titleIcon={faKey}
        title={"Access Tokens"}
      />
      <ExpireTokenModal token={selectedToken} showModal={showExpireModal} setShowModal={setShowExpireModal} expireToken={expireToken} />
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