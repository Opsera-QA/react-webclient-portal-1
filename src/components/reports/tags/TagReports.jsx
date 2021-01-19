import React, { useContext, useState, useEffect } from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import LoadingDialog from "../../common/status_notifications/loading";
import ScreenContainer from "../../common/panels/general/ScreenContainer";
import AccessDeniedDialog from "../../common/status_notifications/accessDeniedInfo";
import BreadcrumbPageLink from "components/common/links/BreadcrumbPageLink";
import Row from "react-bootstrap/Row";

function TagReports() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);

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
    }
    finally {
      setIsLoading(false)
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData || isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"tagReports"}
      pageDescription={"You will be able to view Tag Reports here."}
    >
      <Row className="ml-3">
        <BreadcrumbPageLink breadcrumbDestination={"tagsUsedInPipelineReport"} />
        <BreadcrumbPageLink breadcrumbDestination={"tagsUsedInToolsReport"} />
      </Row>
    </ScreenContainer>
  );
}

export default TagReports;

