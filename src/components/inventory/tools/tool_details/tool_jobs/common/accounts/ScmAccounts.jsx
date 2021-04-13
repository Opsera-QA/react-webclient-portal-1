import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ScmAccountsTable from "./ScmAccountsTable";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import NewScmAccountModal from './NewScmAccountModal';
import scmCreateAccountMetadata from './scm-create-account-metadata';

function ScmAccounts({ toolData, loadData, isLoading }) {
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [scmAccountDataDto, setScmAccountDataDto] = useState(undefined);
  const [editMode, setEditMode] = useState(false);

  const createScmAccount = () => {
    setScmAccountDataDto(new Model(Object.assign(scmCreateAccountMetadata.newModelBase, {
      toolId: toolData.getData("_id"),
      service: toolData.getData("tool_identifier")
    }), scmCreateAccountMetadata, true));    
    setEditMode(false);
    setShowCreateAccountModal(true);
  };

  const selectedJobRow = (rowData) => {    
    setScmAccountDataDto(
      new Model(toolData.getData("accounts")[rowData.index], scmCreateAccountMetadata, false)
    );
    setEditMode(true);
    setShowCreateAccountModal(true);
  };

  return (
    <div>
        <div className="my-1 text-right">
          <Button variant="primary" size="sm"
                  onClick={() => createScmAccount()}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> Register New Account Credentials
          </Button>
          <br/>
        </div>
      <ScmAccountsTable 
        isLoading={isLoading} 
        data={toolData.getData("accounts")} 
        selectedRow={(rowData) => selectedJobRow(rowData)}
      />
      <NewScmAccountModal 
        showModal={showCreateAccountModal} 
        setShowModal={setShowCreateAccountModal} 
        toolData={toolData}         
        loadData={loadData} 
        scmAccountDataDto={scmAccountDataDto}
        setScmAccountDataDto={setScmAccountDataDto}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
}


ScmAccounts.propTypes = {
  toolData: PropTypes.object,  
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};
export default ScmAccounts;
