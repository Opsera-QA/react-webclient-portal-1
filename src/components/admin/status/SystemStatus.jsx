import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import systemStatusActions from "components/admin/status/system-status-actions";
import SystemStatusCard from "components/admin/status/SystemStatusCard";
import StatusLegend from "components/common/status/StatusLegend";
import useComponentStateReference from "hooks/useComponentStateReference";

function SystemStatus() {
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatusData, setSystemStatusData] = useState(undefined);
  const {
    isOpseraAdministrator,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setSystemStatusData(undefined);

      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getSystemStatuses();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
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

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"systemStatus"}
      pageDescription={"Listed below is the current status of system tools for Opsera"}
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