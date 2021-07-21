import React, { useContext, useState, useEffect, useRef } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faAnalytics, faTags, faTools, faUsers } from "@fortawesome/pro-light-svg-icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import userReportsMetadata from "components/reports/users/user-reports-metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import axios from "axios";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import LdapUserByDomainSelectInput from "components/common/list_of_values_input/users/LdapUserByDomainSelectInput";
import ConsolidatedUserReportGroupMembershipTable from "components/reports/users/user/ConsolidatedUserReportGroupMembershipTable";
import ConsolidatedUserReportPipelineOwnershipTable from "components/reports/users/user/ConsolidatedUserReportPipelineOwnershipTable";
import ConsolidatedUserReportToolOwnershipTable from "components/reports/users/user/ConsolidatedUserReportToolOwnershipTable";
import ConsolidatedUserReportTaskOwnershipTable from "components/reports/users/user/ConsolidatedUserReportTaskOwnershipTable";

function ConsolidatedUserReport() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupMembershipModel, setGroupMembershipModel] = useState(new Model({ ...userReportsMetadata }, userReportsMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [groupList, setGroupList] = useState([]);
  const [domain, setDomain] = useState("");
  const [selectedUser, setSelectedUser] = useState(undefined);
  const history = useHistory();

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
      const { ldap } = user;
      const userRoleAccess = await setAccessRoles(user);

      if (isMounted?.current === true && userRoleAccess) {
        setIsLoading(true);
        setAccessRoleData(userRoleAccess);
        setDomain(ldap?.domain);

        if (ldap.domain != null) {
          const groupResponse = await accountsActions.getLdapGroupsWithDomainV2(getAccessToken, cancelSource, ldap.domain);

          if (Array.isArray(groupResponse?.data)) {
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

    setGroupMembershipModel({ ...newDataObject });
    setSelectedUser(groupMembershipModel.getData("user"));
  };

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    history.push(`/reports/${tabSelection}`);
  };

  const getNavigationTabContainer = () => {
    return (
      <NavigationTabContainer>
        <NavigationTab activeTab={"users"} tabText={"All Reports"} handleTabClick={handleTabClick} tabName={"all"} icon={faAnalytics} />
        <NavigationTab activeTab={"users"} tabText={"Tool Reports"} handleTabClick={handleTabClick} tabName={"tools"} icon={faTools} />
        <NavigationTab activeTab={"users"} tabText={"Tag Reports"} handleTabClick={handleTabClick} tabName={"tags"} icon={faTags} />
        <NavigationTab activeTab={"users"} tabText={"User Reports"} handleTabClick={handleTabClick} tabName={"users"} icon={faUsers} />
      </NavigationTabContainer>
    );
  };

  if (!accessRoleData) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"consolidatedUserReport"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      navigationTabContainer={getNavigationTabContainer()}
      pageDescription={"View report for selected user"}
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
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"} md={12} lg={12}>
          <ConsolidatedUserReportGroupMembershipTable
            groups={groupList}
            isLoading={isLoading}
            loadData={loadData}
            domain={domain}
            userDistinguishedName={groupMembershipModel?.getData("dn")}
          />
        </Col>
      </Row>
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"} md={12} lg={6}>
          <ConsolidatedUserReportToolOwnershipTable
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedUser={selectedUser}
          />
        </Col>
        <Col className={"mx-0"} md={12} lg={6}>
          <ConsolidatedUserReportPipelineOwnershipTable
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedUser={selectedUser}
          />
        </Col>
      </Row>
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"} md={12} lg={12}>
        <ConsolidatedUserReportTaskOwnershipTable
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedUser={selectedUser}
          />
        </Col>
      </Row>
    </ScreenContainer>
  );
}

export default ConsolidatedUserReport;
