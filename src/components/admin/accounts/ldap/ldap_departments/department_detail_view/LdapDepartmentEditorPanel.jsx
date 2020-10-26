import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import WarningDialog from "../../../../../common/status_notifications/WarningDialog";
import DtoTextInput from "../../../../../common/input/dto_input/dto-text-input";
import SaveButton from "../../../../../common/buttons/SaveButton";
import DetailPanelContainer from "../../../../../common/panels/detail_panel_container/DetailPanelContainer";
import departmentActions from "../department-functions";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import {getUsersByDomain} from "../../../../../settings/ldap_users/user-functions";
import DtoSelectInput from "../../../../../common/input/dto_input/dto-select-input";

function LdapDepartmentEditorPanel({ ldapDepartmentData, setLdapDepartmentData, orgDomain, authorizedActions, handleClose }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [ldapDepartmentDataDto, setLdapDepartmentDataDto] = useState({});
  const [ldapUsers, setLdapUsers] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setLdapDepartmentDataDto(ldapDepartmentData);
      await getLdapOrganizationUsers();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getLdapOrganizationUsers = async () => {
    const response = await getUsersByDomain(orgDomain, getAccessToken);

    if (response != null && response.length > 0) {
      setLdapUsers(response);
    }
  };

  const createLdapDepartment = async () => {
    return await departmentActions.createDepartment(orgDomain, ldapDepartmentDataDto, getAccessToken);
  };

  const updateLdapDepartment = async () => {
    return await departmentActions.updateDepartment(orgDomain, ldapDepartmentDataDto, getAccessToken);
  };

  if (isLoading || ldapDepartmentDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!authorizedActions.includes("update_department")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this user"} />;
  }

    return (
      <DetailPanelContainer>
          <Row>
            <Col lg={12}>
              <DtoTextInput disabled={!ldapDepartmentDataDto.isNew()} setDataObject={setLdapDepartmentDataDto} dataObject={ldapDepartmentDataDto} fieldName={"name"} />
            </Col>
            <Col lg={12}>
              <DtoSelectInput
                dataObject={ldapDepartmentDataDto}
                setDataObject={setLdapDepartmentDataDto}
                busy={isLoading}
                fieldName={"ownerEmail"}
                groupBy={"emailAddress"}
                valueField={"emailAddress"}
                textField={"name"}
                filter={"contains"}
                selectOptions={ldapUsers}
              />
            </Col>
          </Row>
          <Row>
            <div className="ml-auto mt-3 px-3">
              <SaveButton recordDto={ldapDepartmentDataDto} setData={setLdapDepartmentData} setRecordDto={setLdapDepartmentDataDto} handleClose={handleClose} createRecord={createLdapDepartment} updateRecord={updateLdapDepartment} />
            </div>
          </Row>
      </DetailPanelContainer>
    );
}

LdapDepartmentEditorPanel.propTypes = {
  showButton: PropTypes.bool,
  orgDomain: PropTypes.string,
  ldapDepartmentData: PropTypes.object,
  setLdapDepartmentData: PropTypes.func,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapDepartmentEditorPanel;


