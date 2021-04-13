import React, {useContext, useState} from "react";
import ScmAccountsTable from "./ScmAccountsTable";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import NewScmAccountOverlay from './NewScmAccountModal';
import scmCreateAccountMetadata from './scm-create-account-metadata';
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";

function ScmAccounts({ toolData, loadData, isLoading }) {
  const toastContext = useContext(DialogToastContext);

  const editScmAccount = (rowData) => {
    let scmAccountModel = new Model(toolData.getData("accounts")[rowData.index], scmCreateAccountMetadata, false);
    toastContext.showOverlayPanel(
      <NewScmAccountOverlay
        toolData={toolData}
        loadData={loadData}
        scmAccountData={scmAccountModel}
      />
    );
  };


  const createAccount = () => {
    let scmAccountModel = new Model({...scmCreateAccountMetadata.newModelBase}, scmCreateAccountMetadata, true);
    scmAccountModel.setData("toolId", toolData.getData("_id"));
    scmAccountModel.setData("service", toolData.getData("tool_identifier"));
    toastContext.showOverlayPanel(
      <NewScmAccountOverlay
        toolData={toolData}
        loadData={loadData}
        scmAccountData={scmAccountModel}
      />
    );
  };

  const getTable = () => {
    return (
      <ScmAccountsTable
        isLoading={isLoading}
        data={toolData.getData("accounts")}
        selectedRow={(rowData) => editScmAccount(rowData)}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createAccount}
      isLoading={isLoading}
      body={getTable()}
      type={"Account Credentials"}
      metadata={scmCreateAccountMetadata}
      titleIcon={faTags}
      title={"Accounts"}
    />
  );
}


ScmAccounts.propTypes = {
  toolData: PropTypes.object,  
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};
export default ScmAccounts;
