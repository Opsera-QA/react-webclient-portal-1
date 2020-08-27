import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import JenkinsAccountsTable from "./JenkinsAccountsTable";

import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import NewJenkinsAccountModal from "./NewJenkinsAccountModal";

function JenkinsAccounts({ toolData, loadData }) {
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const createJenkinsAccount = () => {
    setShowCreateAccountModal(true);
  }

  return (
    <div>
        <div className="my-1 text-right">
          <Button variant="primary" size="sm"
                  onClick={() => createJenkinsAccount()}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> Add Jenkins Account Credentials
          </Button>
          <br/>
        </div>
      <JenkinsAccountsTable data={toolData.getData("accounts")}/>
      <NewJenkinsAccountModal showModal={showCreateAccountModal} setShowModal={setShowCreateAccountModal} toolData={toolData} loadData={loadData} />
    </div>
  );
}


JenkinsAccounts.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func
};
export default JenkinsAccounts;
