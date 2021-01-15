import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ldapSettingsMetadata
  from "components/admin/registered_users/registered_user_details/ldap_settings/ldapSettingsMetadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SyncLdapButton from "components/common/buttons/ldap/SyncLdapButton";
import DateTimeField from "components/common/fields/date/DateTimeField";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";

function LdapSettingsPanel({ userData, loadData }) {
  const [userLdapDto, setUserLdapDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    setIsLoading(true);
    setUserLdapDto(new Model(userData.getData("ldap"), ldapSettingsMetadata, false))
    setIsLoading(false);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <EditorPanelContainer showRequiredFieldsMessage={false}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapDto} fieldName={"organization"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapDto} fieldName={"orgAccountOwnerEmail"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapDto} fieldName={"account"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapDto} fieldName={"domain"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapDto} fieldName={"division"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={userLdapDto} fieldName={"type"} />
        </Col>
      </Row>
      <Row>
        <Col>
          <DateTimeField dataObject={userData} fieldName={"ldapSyncAt"}/>
          <SyncLdapButton userData={userData} loadData={loadData} />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

LdapSettingsPanel.propTypes = {
  userData: PropTypes.object,
  loadData: PropTypes.func
};

export default LdapSettingsPanel;


