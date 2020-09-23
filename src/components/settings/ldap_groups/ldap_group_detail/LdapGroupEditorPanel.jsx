import React, {useEffect, useState, useContext} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions.js";
import Row from "react-bootstrap/Row";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DtoSelectInput from "../../../common/input/dto_input/dto-select-input";
import DtoToggleInput from "../../../common/input/dto_input/dto-toggle-input";
import LoadingDialog from "../../../common/status_notifications/loading";
import SaveButton from "../../../common/buttons/SaveButton";
import WarningDialog from "../../../common/status_notifications/WarningDialog";

function LdapGroupEditorPanel({ldapGroupData, currentUserEmail, ldapOrganizationData, setLdapGroupData, handleClose, authorizedActions}) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapGroupDataDto, setLdapGroupDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const groupTypeOptions = [{value: "project", text: "project", groupId: "Group Types"},{value: "tag", text: "tag", groupId: "Group Types"},{value: "user", text: "user", groupId: "Group Types"}];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapGroupDataDto(ldapGroupData);
    setIsLoading(false)
  };

  const createGroup = async () => {
    return await accountsActions.createGroup(ldapOrganizationData, ldapGroupDataDto, currentUserEmail, getAccessToken);
  };

  const updateGroup = async () => {
    return await accountsActions.updateGroup(ldapOrganizationData, ldapGroupDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog/>);
  }

  if (!authorizedActions.includes("update_group")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this group"} />;
  }

    return (
      <>
        <div className="p-3">
          <>
            <Row>
              <Col lg={12}>
                <DtoTextInput disabled={!ldapGroupDataDto.isNew()} fieldName={"name"} dataObject={ldapGroupDataDto}
                              setDataObject={setLdapGroupDataDto}/>
              </Col>
              <Col lg={12}>
                {ldapGroupDataDto.isNew()
                  ? <DtoSelectInput groupBy={"groupId"} fieldName={"groupType"} setDataObject={setLdapGroupDataDto}
                                    dataObject={ldapGroupDataDto} selectOptions={groupTypeOptions}/>
                  : <DtoTextInput disabled={true} fieldName={"groupType"} setData={setLdapGroupDataDto}
                                  dataObject={ldapGroupDataDto}/>}
              </Col>
              <Col lg={12}>
                <DtoTextInput disabled={ldapGroupDataDto.getData("groupType") !== "project"}
                              fieldName={"externalSyncGroup"} dataObject={ldapGroupDataDto}
                              setDataObject={setLdapGroupDataDto}/>
              </Col>
              <Col lg={12}>
                <DtoToggleInput disabled={ldapGroupDataDto.groupType === "role"} fieldName={"isSync"}
                                dataObject={ldapGroupDataDto} setDataObject={setLdapGroupDataDto}/>
              </Col>
            </Row>
            <Row>
              <div className="ml-auto mt-3 px-3">
                <SaveButton recordDto={ldapGroupDataDto} setData={setLdapGroupData} setRecordDto={ldapGroupDataDto} handleClose={handleClose} createRecord={createGroup} updateRecord={updateGroup} />
              </div>
            </Row>
          </>
        </div>
      </>
    );
}

LdapGroupEditorPanel.propTypes = {
  currentUserEmail: PropTypes.string,
  setLdapGroupData: PropTypes.func,
  ldapGroupData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapGroupEditorPanel;


