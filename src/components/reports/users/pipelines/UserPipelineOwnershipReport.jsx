import React, { useContext, useState, useEffect, useRef } from "react";
import LoadingDialog from "components/common/status_notifications/loading";
import UserPipelineOwnershipReportTable from "components/reports/users/pipelines/UserPipelineOwnershipReportTable";
import userReportsMetadata from "components/reports/users/user-reports-metadata";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import axios from "axios";
import ReportsSubNavigationBar from "components/reports/ReportsSubNavigationBar";

function UserPipelineOwnershipReport() {
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [pipelineOwnershipModel, setPipelineOwnershipModel] = useState(new Model({ ...userReportsMetadata }, userReportsMetadata, false));
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
    const newPipelineOwnershipModel = pipelineOwnershipModel;
    const user = value?.user;

    newPipelineOwnershipModel.setData("user", user);

    if (user) {
      newPipelineOwnershipModel.setData("_id", user?._id);
      newPipelineOwnershipModel.setData("name", `${user?.firstName} ${user.lastName}` );
      newPipelineOwnershipModel.setData("firstName", user?.firstName);
      newPipelineOwnershipModel.setData("lastName", user?.lastName);
      newPipelineOwnershipModel.setData("emailAddress", user?.email);
    }

    setPipelineOwnershipModel({...newPipelineOwnershipModel});
    setSelectedUser(pipelineOwnershipModel.getData("user"));
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelineOwnershipReport"}
      accessRoleData={accessRoleData}
      navigationTabContainer={<ReportsSubNavigationBar currentTab={"userReportViewer"} />}
      roleRequirement={ROLE_LEVELS.ADMINISTRATORS}
      pageDescription={"View pipelines owned by selected user"}
    >
      <Row className={"mb-3 mx-0"}>
        <Col className={"mx-0"}>
          <LdapUserSelectInput
            fieldName={"name"}
            model={pipelineOwnershipModel}
            setModel={setPipelineOwnershipModel}
            setDataFunction={setDataFunction}
            busy={isLoading}
          />
        </Col>
      </Row>
      <UserPipelineOwnershipReportTable
        selectedUser={selectedUser}
      />
    </ScreenContainer>
  );
}

export default UserPipelineOwnershipReport;