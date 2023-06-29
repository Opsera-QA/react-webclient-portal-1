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
import axios from "axios";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import EmailAddressField from "components/common/fields/text/email/EmailAddressField";
import RevokeLdapGroupMembershipButton from "components/common/buttons/ldap/RevokeLdapGroupMembershipButton";
import RevokeLdapSiteRoleMembershipButton from "components/common/buttons/ldap/RevokeLdapSiteRoleMembershipButton";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import DeactivateUserButton from "components/common/buttons/user/DeactivateUserButton";
import ReactivateUserButton from "components/common/buttons/user/ReactivateUserButton";
import RevokeUserAccessTokensButton from "components/common/buttons/access_tokens/RevokeUserAccessTokensButton";

function LdapSettingsPanel({userData, ldapData, loadData, showSyncButton}) {
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

  const getUserActivationButton = () => {
    if (userData?.getData("active") === false) {
      return (
        <ReactivateUserButton
          userModel={userData}
          loadData={loadData}
          className={"mt-5"}
        />
      );
    }

    return (
      <DeactivateUserButton
        userModel={userData}
        loadData={loadData}
        className={"mt-5"}
      />
    );
  };

  const getSyncButton = () => {
    if (showSyncButton) {
      return (
        <Row>
          <Col xs={12}>
            <DateTimeField dataObject={userData} fieldName={"ldapSyncAt"}/>
            <ButtonContainerBase
              className={"mt-3"}
              leftSideButtons={
                <SyncLdapButton
                  userData={userData}
                  loadData={loadData}
                />
              }
            />
          </Col>
          {getLdapButtons()}
        </Row>
      );
    }
  };

  const getLdapButtons = () => {
    if (showSyncButton) {
      return (
        <>
          <Col xs={12}>
            <RevokeLdapGroupMembershipButton
              userModel={userData}
              loadData={loadData}
              className={"mt-5 mb-2"}
            />
          </Col>
          <Col xs={12}>
            <RevokeLdapSiteRoleMembershipButton
              userModel={userData}
              loadData={loadData}
              className={"my-2"}
            />
          </Col>
          <Col xs={12}>
            <RevokeUserAccessTokensButton
              userModel={userData}
              loadData={loadData}
              className={"my-2"}
            />
          </Col>
          <Col xs={12}>
            {getUserActivationButton()}
          </Col>
        </>
      );
    }
  };

  if (isLoading || userLdapModel == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer className={"m-3"}>
      <Row>
        <Col lg={6}>
          <TextFieldBase
            fieldName={"organization"}
            dataObject={userLdapModel}
            showClipboardButton={true}
          />
        </Col>
        <Col lg={6}>
          <EmailAddressField
            fieldName={"orgAccountOwnerEmail"}
            model={userLdapModel}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            fieldName={"account"}
            dataObject={userLdapModel}
            showClipboardButton={true}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            fieldName={"domain"}
            dataObject={userLdapModel}
            showClipboardButton={true}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={userLdapModel}
            fieldName={"division"}
          />
        </Col>
        <Col lg={6}>
          <TextFieldBase
            dataObject={userLdapModel}
            fieldName={"type"}
          />
        </Col>
      </Row>
      {getSyncButton()}
    </SummaryPanelContainer>
  );
}

LdapSettingsPanel.propTypes = {
  userData: PropTypes.object,
  ldapData: PropTypes.object,
  loadData: PropTypes.func,
  showSyncButton: PropTypes.bool
};

export default LdapSettingsPanel;


