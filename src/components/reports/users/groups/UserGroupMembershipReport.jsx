import React, {useState, useEffect} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import userReportsMetadata from "components/reports/users/user-reports-metadata";
import UserGroupMembershipReportTable from "components/reports/users/groups/UserGroupMembershipReportTable";
import LdapUserByDomainSelectInput from "components/common/list_of_values_input/users/LdapUserByDomainSelectInput";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetLdapGroups from "hooks/ldap/groups/useGetLdapGroups";

function UserGroupMembershipReport() {
  const [groupMembershipModel, setGroupMembershipModel] = useState(new Model({...userReportsMetadata}, userReportsMetadata, false));
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isAuditor,
    isSecurityManager,
    userData,
    isSaasUser,
  } = useComponentStateReference();
  const {
    groups,
    isLoading,
    loadData,
    error,
  } = useGetLdapGroups();

  const setDataFunction = (fieldName, value) => {
    let newDataObject = groupMembershipModel;
    const user = value?.user;

    newDataObject.setData("user", user);

    //TODO: These object properties are probably unnecessary if we just keep user.
    if (user) {
      newDataObject.setData("name", user?.name);
      newDataObject.setData("firstName", user?.firstName);
      newDataObject.setData("lastName", user?.lastName);
      newDataObject.setData("emailAddress", user?.emailAddress);
      newDataObject.setData("dn", user?.dn);
    }

    setGroupMembershipModel({...newDataObject});
  };

  if (
    isSaasUser === true || (
      isSiteAdministrator !== true
      && isOpseraAdministrator !== true
      && isAuditor !== true
      && isSecurityManager !== true)
  ) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"groupMembershipReport"}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"}/>}
      pageDescription={"View the Group Membership of a selected User"}
      error={error}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <LdapUserByDomainSelectInput
            model={groupMembershipModel}
            setModel={setGroupMembershipModel}
            setDataFunction={setDataFunction}
            fieldName={"name"}
          />
        </Col>
      </Row>
      <UserGroupMembershipReportTable
        groups={groups}
        isLoading={isLoading}
        loadData={loadData}
        domain={userData?.ldap?.domain}
        userDistinguishedName={groupMembershipModel?.getData("dn")}
      />
    </ScreenContainer>
  );
}

export default UserGroupMembershipReport;

