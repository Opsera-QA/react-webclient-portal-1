import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {DialogToastContext} from "contexts/DialogToastContext";
import departmentActions from "components/settings/ldap_departments/department-functions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";

function LdapDepartmentEditorPanel({ ldapDepartmentData, reloadData, orgDomain, handleClose }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [ldapDepartmentDataDto, setLdapDepartmentDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setLdapDepartmentDataDto(ldapDepartmentData);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const addOwnerIfNotPresent = async () => {
    const newOwnerEmail = ldapDepartmentDataDto?.getData("ownerEmail");
    let member = ldapDepartmentData.members.find((member) => member.emailAddress === newOwnerEmail.emailAddress);

    if (member == null) {
      let members = ldapDepartmentData.members;
      let emailList = members.reduce((acc, item) => {
        acc.push(item.emailAddress);
        return acc;
      }, []);

      emailList.push(newOwnerEmail);
      await departmentActions.syncDepartmentMembership(orgDomain, ldapDepartmentDataDto.getData("departmentGroupName"), emailList, getAccessToken);
      reloadData();
    }
  };


  const createLdapDepartment = async () => {
    let newDepartmentResponse;

    try {
      newDepartmentResponse = await departmentActions.createDepartment(orgDomain, ldapDepartmentDataDto, getAccessToken);
      const newOwnerEmail = ldapDepartmentDataDto.getData("ownerEmail");

      if (newDepartmentResponse?.data) {
        await departmentActions.syncDepartmentMembership(orgDomain, newDepartmentResponse?.data?.departmentGroupName, [newOwnerEmail], getAccessToken);
      }
    }
    catch (error) {
      if (newDepartmentResponse != null && newDepartmentResponse.data != null) {
        toastContext.showSystemInformationBanner("Department was successfully created, but owner could not be added to the department's group membership.");
        return newDepartmentResponse;
      }

      return error;
    }

    return newDepartmentResponse;
  };

  const updateLdapDepartment = async () => {
    let updatedDepartmentResponse;

    try {
      updatedDepartmentResponse = await departmentActions.updateDepartment(orgDomain, ldapDepartmentDataDto, getAccessToken);
      await addOwnerIfNotPresent();
    }
    catch (error) {
      if (updatedDepartmentResponse != null && updatedDepartmentResponse.data != null) {
        toastContext.showSystemInformationBanner("Department was successfully updated, but owner could not be added to the department's group membership.");
        return updatedDepartmentResponse;
      }

      return error;
    }

    return updatedDepartmentResponse;
  };

  if (isLoading || ldapDepartmentDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      createRecord={createLdapDepartment}
      updateRecord={updateLdapDepartment}
      setRecordDto={setLdapDepartmentDataDto}
      recordDto={ldapDepartmentDataDto}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase disabled={!ldapDepartmentDataDto.isNew()} setDataObject={setLdapDepartmentDataDto} dataObject={ldapDepartmentDataDto} fieldName={"name"} />
        </Col>
        <Col lg={12}>
          {/*TODO: Make component*/}
          <LdapUserSelectInput
            model={ldapDepartmentDataDto}
            setModel={setLdapDepartmentDataDto}
            fieldName={"ownerEmail"}
            valueField={"emailAddress"}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

LdapDepartmentEditorPanel.propTypes = {
  showButton: PropTypes.bool,
  orgDomain: PropTypes.string,
  ldapDepartmentData: PropTypes.object,
  handleClose: PropTypes.func,
  reloadData: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapDepartmentEditorPanel;


