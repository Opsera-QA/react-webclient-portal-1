import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import LdapOrganizationOpseraUserSelectInput
  from "components/common/list_of_values_input/admin/accounts/ldap_accounts/LdapOrganizationOpseraUserSelectInput";
import axios from "axios";

function LdapOrganizationEditorPanel({ ldapOrganizationData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ldapOrganizationModel, setLdapOrganizationModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapOrganizationModel({...ldapOrganizationData});
    setIsLoading(false);
  };

  const createOrganization = async () => {
    return await accountsActions.createOrganizationV2(getAccessToken, cancelTokenSource, ldapOrganizationModel);
  };

  const updateLdapOrganization = async () => {
    return await accountsActions.updateOrganizationV2(getAccessToken, cancelTokenSource, ldapOrganizationModel);
  };

  if (isLoading || ldapOrganizationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      recordDto={ldapOrganizationModel}
      setRecordDto={setLdapOrganizationModel}
      updateRecord={updateLdapOrganization}
      createRecord={createOrganization}
      addAnotherOption={false}
    >
      <Row>
        <Col lg={12}>
          <LdapOrganizationOpseraUserSelectInput
            model={ldapOrganizationModel}
            setModel={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={!ldapOrganizationModel.isNew()}
            fieldName={"name"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"orgName"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"orgOwner"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"orgOwnerEmail"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"envCount"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"numberOfLicenses"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"objectCount"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={true}
            fieldName={"subscription"}
            dataObject={ldapOrganizationModel}
            setDataObject={setLdapOrganizationModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

LdapOrganizationEditorPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  handleClose: PropTypes.func,
};

export default LdapOrganizationEditorPanel;


