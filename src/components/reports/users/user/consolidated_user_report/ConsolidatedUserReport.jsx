import React, {useState, useEffect, useRef, useContext} from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { faAnalytics, faTags, faTools, faUsers } from "@fortawesome/pro-light-svg-icons";
import { useHistory } from "react-router-dom";
import Model from "core/data_model/model";
import userReportsMetadata from "components/reports/users/user-reports-metadata";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import LdapUserByDomainSelectInput from "components/common/list_of_values_input/users/LdapUserByDomainSelectInput";
import ConsolidatedUserToolAccessReport from "components/reports/users/user/consolidated_user_report/tool_access/ConsolidatedUserToolAccessReport";
import ConsolidatedUserGroupMembershipReport
  from "components/reports/users/user/consolidated_user_report/group_membership/ConsolidatedUserGroupMembershipReport";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import InformationDialog from "components/common/status_notifications/info";
import ConsolidatedUserPipelineAccessReport
  from "components/reports/users/user/consolidated_user_report/pipeline_access/ConsolidatedUserPipelineAccessReport";
import ConsolidatedUserTaskAccessReport
  from "components/reports/users/user/consolidated_user_report/task_access/ConsolidatedUserTaskAccessReport";

function ConsolidatedUserReport() {
  const { getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [ldapUserModel, setLdapUserModel] = useState(new Model({ ...userReportsMetadata }, userReportsMetadata, false));
  const isMounted = useRef(false);
  const history = useHistory();

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      const userRoleAccess = await getAccessRoleData();
      if (isMounted?.current === true && userRoleAccess) {
        setAccessRoleData(userRoleAccess);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const setDataFunction = (fieldName, value) => {
    let newDataObject = ldapUserModel;
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

    setLdapUserModel({ ...newDataObject });
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

  const getBody = () => {
    if (ldapUserModel == null || ldapUserModel?.getData("user") == null) {
      return (
        <div className={"m-3"}>
          <InformationDialog message={"Please select a user to get started"} />
        </div>
      );
    }

    return (
      <div>
        <Row className={"mb-3 mx-0"}>
          <Col className={"mx-0"} md={12} lg={12}>
            <ConsolidatedUserGroupMembershipReport
              ldapUserDistinguishedName={ldapUserModel?.getData("dn")}
            />
          </Col>
        </Row>
        <Row className={"mb-3 mx-0"}>
          <Col className={"mx-0"} md={12} lg={6}>
            <ConsolidatedUserToolAccessReport
              userEmailAddress={ldapUserModel?.getData("emailAddress")}
            />
          </Col>
          <Col className={"mx-0"} md={12} lg={6}>
            <ConsolidatedUserPipelineAccessReport
              userEmailAddress={ldapUserModel?.getData("emailAddress")}
            />
          </Col>
        </Row>
        <Row className={"mb-3 mx-0"}>
          <Col className={"mx-0"} md={12} lg={12}>
            <ConsolidatedUserTaskAccessReport
              userEmailAddress={ldapUserModel?.getData("emailAddress")}
              />
          </Col>
        </Row>
      </div>
    );
  };

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
            model={ldapUserModel}
            setModel={setLdapUserModel}
            setDataFunction={setDataFunction}
            fieldName={"name"}
          />
        </Col>
      </Row>
      {getBody()}
    </ScreenContainer>
  );
}

export default ConsolidatedUserReport;
