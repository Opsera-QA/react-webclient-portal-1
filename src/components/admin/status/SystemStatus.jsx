import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import systemStatusActions from "components/admin/status/system-status-actions";
import SystemStatusCard from "components/admin/status/SystemStatusCard";
import StatusLegend from "components/common/status/StatusLegend";

function SystemStatus() {
  const toastContext = useContext(DialogToastContext);
  const {getAccessToken, getUserRecord, setAccessRoles} = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatusData, setSystemStatusData] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess?.OpseraAdministrator) {
        await getSystemStatuses();
      }
    }
  };

  const getSystemStatuses = async () => {
    const response = await systemStatusActions.getSystemStatuses(getAccessToken);
    let data = response?.data?.message ? response.data.message : [];
    setSystemStatusData(data);
  };

  const getSystemStatusCards = () => {
    if (Array.isArray(systemStatusData) && systemStatusData.length > 0) {
      return (
        systemStatusData.map((systemStatus, key) => (
          systemStatus?.instance[0]?.status &&
          <Col key={key} md={3} sm={6}>
            <SystemStatusCard systemStatus={systemStatus}/>
          </Col>
        ))
      );
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog />);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"systemStatus"}
      pageDescription={"Listed below is the current status of system tools for Opsera"}
      accessDenied={!isLoading && !accessRoleData.OpseraAdministrator}
      isLoading={isLoading}
    >
      <Row>
        <Col sm={12} className="p-0">
          <Row>
            <Col sm={6}/>
            <Col sm={6}>
              <StatusLegend/>
            </Col>
          </Row>
        </Col>
        <Col sm={12} className="status-table p-3">
          {/*TODO: When query is working, replace with getSystemStatusCards()*/}
          <Row>
            {systemStatusData && systemStatusData.map((systemStatus, key) => (
              systemStatus.instance && systemStatus.instance[0] && systemStatus.instance[0].status ?
              <Col key={key} md={3} sm={6}>
                <SystemStatusCard systemStatus={systemStatus}/>
              </Col> : null
            ))
            }
          </Row>
        </Col>
      </Row>
    </ScreenContainer>
  );
}


export default SystemStatus;