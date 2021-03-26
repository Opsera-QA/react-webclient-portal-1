import React, {useEffect, useState, useContext} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions.js";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import LoadingDialog from "components/common/status_notifications/loading";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import LdapOpseraUserSelectInputBase
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOpseraUserSelectInputBase";

function OrganizationEditorPanel({organizationData, handleClose }) {
  const {getAccessToken} = useContext(AuthContext);
  const [organizationModel, setOrganizationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setOrganizationModel(organizationData);
    setIsLoading(false);
  };

  const createOrganization = async () => {
    // return await accountsActions.createGroup(orgDomain, organizationModel, currentUserEmail, getAccessToken);
  };

  const updateOrganization = async () => {
    // return await accountsActions.updateGroup(orgDomain, organizationModel, getAccessToken);
  };

  if (isLoading || organizationModel == null) {
    return (<LoadingDialog />);
  }

  return (
    <EditorPanelContainer
      createRecord={createOrganization}
      updateRecord={updateOrganization}
      setRecordDto={setOrganizationModel}
      recordDto={organizationModel}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase disabled={!organizationModel.isNew()} fieldName={"name"} dataObject={organizationModel} setDataObject={setOrganizationModel}/>
        </Col>
        <Col lg={12}>
          <LdapOpseraUserSelectInputBase fieldName={"leader"} dataObject={organizationModel} setDataObject={setOrganizationModel} disabled={true} />
        </Col>
        <Col lg={12}>
          <TagMultiSelectInput
            fieldName={"tags"}
            dataObject={organizationModel}
            setDataObject={setOrganizationModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

OrganizationEditorPanel.propTypes = {
  currentUserEmail: PropTypes.string,
  orgDomain: PropTypes.string,
  setorganizationData: PropTypes.func,
  organizationData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array,
  existingGroupNames: PropTypes.array
};

export default OrganizationEditorPanel;


