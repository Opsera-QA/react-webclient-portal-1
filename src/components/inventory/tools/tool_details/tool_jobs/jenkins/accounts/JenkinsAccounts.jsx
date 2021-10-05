import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import JenkinsAccountsTable from "./JenkinsAccountsTable";
import Model from "core/data_model/model";


import PropTypes from "prop-types";
import NewJenkinsAccountModal from "./NewJenkinsAccountModal";
import jenkinsCreateAccountMetadata from "./jenkins-create-account-metadata";

function JenkinsAccounts({ toolData, loadData, isLoading }) {
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [jenkinsAccountData, setJenkinsAccountData] = useState(undefined);
  const [applicationId, setApplicationID] = useState(undefined);

  const createJenkinsAccount = () => {
    setJenkinsAccountData(new Model(jenkinsCreateAccountMetadata.newObjectFields, jenkinsCreateAccountMetadata, true));
    setApplicationID(undefined);
    setShowCreateAccountModal(true);
  };

  const selectedJobRow = (rowData) => {
    let newDataObject = toolData.getData("accounts")[rowData.index];
    setApplicationID(newDataObject.gitCredential);
    setJenkinsAccountData(
      new Model(toolData.getData("accounts")[rowData.index], jenkinsCreateAccountMetadata, false)
    );
    setShowCreateAccountModal(true);
  };

  return (
    <div>
        <div className="my-1 text-right">
          <Button variant="primary" size="sm"
                  onClick={() => createJenkinsAccount()}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> Register New Account Credentials
          </Button>
          <br/>
        </div>
      <JenkinsAccountsTable isLoading={isLoading} data={toolData.getData("accounts")} selectedRow={(rowData) => selectedJobRow(rowData)}/>
      <NewJenkinsAccountModal showModal={showCreateAccountModal} setShowModal={setShowCreateAccountModal} toolData={toolData} loadData={loadData} jenkinsAccountDataDto={jenkinsAccountData} credentialId={applicationId}/>
    </div>
  );
}


JenkinsAccounts.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};
export default JenkinsAccounts;
