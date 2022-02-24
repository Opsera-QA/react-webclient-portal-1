import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {jenkinsToolAccountMetadata} from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccount.metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {faUsers} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import CreateJenkinsAccountOverlay
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/CreateJenkinsAccountOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import modelHelpers from "components/common/model/modelHelpers";

function JenkinsToolAccountsTable(
  {
    jenkinsAccounts,
    isLoading,
    loadData,
    isMounted,
    toolId,
    setJenkinsAccountModel,
  }) {
  const fields = jenkinsToolAccountMetadata.fields;
  const toastContext = useContext(DialogToastContext);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "service")),
      getTableTextColumn(getField(fields, "toolId")),
      getTableTextColumn(getField(fields, "gitUserName")),
      getTableTextColumn(getField(fields, "gitCredential")),
    ],
    []
  );

  const createJenkinsAccountCredentials = () => {
    toastContext.showOverlayPanel(
      <CreateJenkinsAccountOverlay
        toolId={toolId}
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const selectRowFunction = (row) => {
    setJenkinsAccountModel(modelHelpers.parseObjectIntoModel(row?.original, jenkinsToolAccountMetadata));
  };

  const getJenkinsAccountsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={jenkinsAccounts}
        onRowSelect={selectRowFunction}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createJenkinsAccountCredentials}
      supportSearch={true}
      isLoading={isLoading}
      body={getJenkinsAccountsTable()}
      metadata={jenkinsToolAccountMetadata}
      titleIcon={faUsers}
      title={"Account Credentials"}
      className={"px-2 pb-2"}
      showBorder={false}
    />
  );
}

JenkinsToolAccountsTable.propTypes = {
  jenkinsAccounts: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  toolId: PropTypes.string,
  setJenkinsAccountModel: PropTypes.func,
};

export default JenkinsToolAccountsTable;