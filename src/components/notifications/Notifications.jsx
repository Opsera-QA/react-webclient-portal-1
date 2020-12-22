import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingDialog from "../common/status_notifications/loading";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import { DialogToastContext } from "../../contexts/DialogToastContext";
import ScreenContainer from "../common/panels/general/ScreenContainer";

function Notifications() {
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
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData || isLoading) {
    return <LoadingDialog size="sm" />;
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return <AccessDeniedDialog roleData={accessRoleData} />;
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"notifications"}
      pageDescription={"Manage notification policies for the Opsera Analytics Engine."}
    >
      {
        //TODO Notification and Alerting stuff goes here
      }
      <div style={{ display: "flex", justifyContent: "center" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a mauris gravida lacus ultricies lacinia.
        Suspendisse mollis, orci sed mollis efficitur, velit massa pharetra magna, at rhoncus diam quam eu nisl.
        Phasellus eget erat quis eros vestibulum euismod ut finibus felis. Sed ac commodo dolor. Sed ultrices arcu nisl,
        vel rutrum sem dignissim eget. Morbi sit amet orci sem.
      </div>
    </ScreenContainer>
  );
}

export default Notifications;
