import React, { useContext, useState, useEffect, useRef } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import userReportsMetadata from "components/reports/users/user-reports-metadata";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faAnalytics, faTags, faTools, faUsers } from "@fortawesome/pro-light-svg-icons";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import UserTaskOwnershipReportTable from "components/reports/users/tasks/UserTaskOwnershipReportTable";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import axios from "axios";

function UserTaskOwnershipReport() {
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [taskOwnershipModel, setTaskOwnershipModel] = useState(new Model({ ...userReportsMetadata }, userReportsMetadata, false));
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

  const loadData = async () => {
    try {
      const user = await getUserRecord();
      const userRoleAccess = await setAccessRoles(user);

      if (isMounted?.current === true && userRoleAccess) {
        setIsLoading(true);
        setAccessRoleData(userRoleAccess);
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

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  const setDataFunction = (fieldName, value) => {
    const newTaskOwnershipModel = taskOwnershipModel;
    const user = value?.user;

    newTaskOwnershipModel.setData("user", user);

    if (user) {
      newTaskOwnershipModel.setData("_id", user?._id);
      newTaskOwnershipModel.setData("name", `${user?.firstName} ${user.lastName}` );
      newTaskOwnershipModel.setData("firstName", user?.firstName);
      newTaskOwnershipModel.setData("lastName", user?.lastName);
      newTaskOwnershipModel.setData("emailAddress", user?.email);
    }

    setTaskOwnershipModel({...newTaskOwnershipModel});
    setSelectedUser(taskOwnershipModel.getData("user"));
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
      return (<LoadingDialog size="sm"/>);
    }

  return (
    <ScreenContainer
      breadcrumbDestination={"taskOwnershipReport"}
      accessRoleData={accessRoleData}
      navigationTabContainer={getNavigationTabContainer()}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      pageDescription={"View tasks owned by selected user"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <LdapUserSelectInput
            fieldName={"name"}
            model={taskOwnershipModel}
            setModel={setTaskOwnershipModel}
            setDataFunction={setDataFunction}
            busy={isLoading}
          />
        </Col>
      </Row>
        <UserTaskOwnershipReportTable
          selectedUser={selectedUser}
        />
    </ScreenContainer>
  );
}

export default UserTaskOwnershipReport;