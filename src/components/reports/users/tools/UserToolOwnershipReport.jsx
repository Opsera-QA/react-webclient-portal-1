import React, { useContext, useState, useEffect, useRef } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import userReportsMetadata from "components/reports/users/user-reports-metadata";
import NavigationTabContainer from "components/common/tabs/navigation/NavigationTabContainer";
import NavigationTab from "components/common/tabs/navigation/NavigationTab";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import UserToolOwnershipReportTable from "components/reports/users/tools/UserToolOwnershipReportTable";
import axios from "axios";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";

function UserToolOwnershipReport() {
  const { getUserRecord,  setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [toolOwnershipModel, setToolOwnershipModel] = useState(new Model({ ...userReportsMetadata }, userReportsMetadata, false));
  const [selectedUser, setSelectedUser] = useState(undefined);

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

  const setDataFunction = (fieldName, value) => {
    const newToolOwnershipModel = toolOwnershipModel;
    const user = value?.user;

    newToolOwnershipModel.setData("user", user);

    if (user) {
      newToolOwnershipModel.setData("_id", user?._id);
      newToolOwnershipModel.setData("name", `${user?.firstName} ${user.lastName}` );
      newToolOwnershipModel.setData("firstName", user?.firstName);
      newToolOwnershipModel.setData("lastName", user?.lastName);
      newToolOwnershipModel.setData("emailAddress", user?.email);
    }

    setToolOwnershipModel({...newToolOwnershipModel});
    setSelectedUser(toolOwnershipModel.getData("user"));
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"taskOwnershipReport"}
      accessRoleData={accessRoleData}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"}/>}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      pageDescription={"View tasks owned by selected user"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <LdapUserSelectInput
            fieldName={"name"}
            model={toolOwnershipModel}
            setModel={setToolOwnershipModel}
            setDataFunction={setDataFunction}
            busy={isLoading}
          />
        </Col>
      </Row>
      <UserToolOwnershipReportTable
        selectedUser={selectedUser}
      />
    </ScreenContainer>
  );
}

export default UserToolOwnershipReport;