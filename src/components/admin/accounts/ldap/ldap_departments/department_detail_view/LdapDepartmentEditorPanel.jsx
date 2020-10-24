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

function LdapDepartmentEditorPanel({ ldapDepartmentData, setLdapDepartmentData, authorizedActions, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ldapDepartmentDataDto, setLdapDepartmentDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapDepartmentDataDto(ldapDepartmentData);
    setIsLoading(false);
  };

  const createLdapDepartment = async () => {
    // return await accountsActions.createDepartment(ldapDepartmentDataDto, getAccessToken);
  };

  const updateLdapDepartment = async () => {
    // return await accountsActions.updateDepartment(departmentName, ldapDepartmentDataDto, getAccessToken);
  };

  if (isLoading) {
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
              <DtoTextInput disabled={!ldapDepartmentDataDto.isNew()} setDataObject={setLdapDepartmentDataDto} dataObject={ldapDepartmentDataDto} fieldName={"ownerEmail"} />
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


