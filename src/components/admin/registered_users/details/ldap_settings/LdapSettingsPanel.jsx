import React, {useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ldapSettingsMetadata
  from "components/admin/registered_users/details/ldap_settings/ldapSettingsMetadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SyncLdapButton from "components/common/buttons/ldap/SyncLdapButton";
import DateTimeField from "components/common/fields/date/DateTimeField";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import axios from "axios";

function LdapSettingsPanel({ userData, ldapData, loadData, showSyncButton }) {
  const [userLdapModel, setUserLdapModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    isMounted.current = true;

    initialize().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(ldapData)]);

  const initialize = async () => {
    setIsLoading(true);
    setUserLdapModel(new Model(ldapData, ldapSettingsMetadata, false));
    setIsLoading(false);
  };

  const getSyncButton = () => {
    if (showSyncButton) {
      return (
        <Row>
          <Col>
            <DateTimeField dataObject={userData} fieldName={"ldapSyncAt"}/>
            <SyncLdapButton userData={userData} loadData={loadData} />
          </Col>
        </Row>
      );
    }
  };

  if (isLoading || userLdapModel == null) {
    return <></>;
  }

  return (
    <EditorPanelContainer showRequiredFieldsMessage={false}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapModel} fieldName={"organization"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapModel} fieldName={"orgAccountOwnerEmail"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapModel} fieldName={"account"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapModel} fieldName={"domain"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapModel} fieldName={"division"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapModel} fieldName={"type"} />
        </Col>
      </Row>
      {getSyncButton()}
    </EditorPanelContainer>
  );
}

LdapSettingsPanel.propTypes = {
  userData: PropTypes.object,
  ldapData: PropTypes.object,
  loadData: PropTypes.func,
  showSyncButton: PropTypes.bool
};

export default LdapSettingsPanel;


