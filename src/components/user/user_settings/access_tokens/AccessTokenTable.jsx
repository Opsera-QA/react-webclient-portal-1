import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableButtonColumn, getTableDateAndTimeUntilValueColumn,
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
import {faKey} from "@fortawesome/pro-light-svg-icons";
import {convertFutureDateToDhmsFromNowString, getDaysUntilDate} from "components/common/helpers/date/date.helpers";

function AccessTokenTable({accessTokenData, loadData, isMounted, isLoading, cancelTokenSource, setFilterModel, filterModel}) {
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
      getTableDateAndTimeUntilValueColumn("Time Until Expiration", "expiration"),
      getTableButtonColumn("row", "", "danger", "Expire", toggleDeleteModal),
      getTableButtonColumn("_id", "", "outline-primary", "View Details", viewDetails)
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
  };

  const rowStyling = (row) => {
    const daysUntilDate = getDaysUntilDate(new Date(row["values"]?.expiration));

    if (daysUntilDate == null || daysUntilDate >= 7) {
      return "";
    }

    if (daysUntilDate <= -1 || daysUntilDate === 0) {
      return " expiring-within-a-day";
    }

    if (daysUntilDate <= 6) {
      return " expiring-within-a-week";
    }

    return "";
  };

  const getAccessTokensTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        isLoading={isLoading}
        data={accessTokenData}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        loadData={loadData}
        rowStyling={rowStyling}
        setPaginationDto={setFilterModel}
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
        filterDto={filterModel}
        setFilterDto={setFilterModel}
        supportSearch={true}
        title={"Access Tokens"}
      />
      <ExpireTokenModal token={selectedToken} showModal={showExpireModal} setShowModal={setShowExpireModal} expireToken={expireToken} />
    </div>
  );
}

AccessTokenTable.propTypes = {
  accessTokenData: PropTypes.array,
  isLoading: PropTypes.bool,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  cancelTokenSource: PropTypes.object,
};

export default AccessTokenTable;