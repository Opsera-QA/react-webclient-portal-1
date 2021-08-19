import React, { useContext, useState, useEffect, useRef } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import {faAnalytics, faTags, faTools, faUsers} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import userReportsMetadata from "components/reports/users/user-reports-metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import axios from "axios";
import UserGroupMembershipReportTable from "components/reports/users/groups/UserGroupMembershipReportTable";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import LdapUserByDomainSelectInput from "components/common/list_of_values_input/users/LdapUserByDomainSelectInput";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";

function UserGroupMembershipReport() {
  const {getUserRecord, getAccessToken, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupMembershipModel, setGroupMembershipModel] = useState(new Model({...userReportsMetadata}, userReportsMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [groupList, setGroupList] = useState([]);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      const user = await getUserRecord();
      const {ldap} = user;
      const userRoleAccess = await setAccessRoles(user);
      
      if (isMounted?.current === true && userRoleAccess) {
        setIsLoading(true);
        setAccessRoleData(userRoleAccess);
        setDomain(ldap?.domain);
  
        if (ldap.domain != null) {
          const groupResponse = await accountsActions.getLdapGroupsWithDomainV2(getAccessToken, cancelSource, ldap.domain);

          if (Array.isArray(groupResponse?.data)){
            setGroupList(groupResponse?.data);
          }
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

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

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"groupMembershipReport"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"} />}
      pageDescription={"View the Group Membership of a selected User"}
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
        groups={groupList}
        isLoading={isLoading}
        loadData={loadData}
        domain={domain}
        userDistinguishedName={groupMembershipModel?.getData("dn")}
      />
    </ScreenContainer>
  );
}

export default UserGroupMembershipReport;

