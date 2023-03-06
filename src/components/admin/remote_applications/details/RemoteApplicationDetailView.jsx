import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";
import RemoteApplicationTelemetryActions from "components/admin/remote_applications/remote-application-actions";
import RemoteApplicationDetailPanel
  from "components/admin/remote_applications/details/RemoteApplicationDetailPanel";
import RemoteApplicationModel from "components/admin/remote_applications/remoteApplication.model";
import RemoteApplicationTelemetryManagementSubNavigationBar
  from "components/admin/remote_applications/RemoteApplicationTelemetryManagementSubNavigationBar";

function RemoteApplicationDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const { id } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [telemetryData, setTelemetryData] = useState(undefined);
  const [telemetryMetadata, setTelemetryMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
  },[]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess) && id) {
        await getTelemetryRecord(cancelSource);
      }
    }
  };

  const getTelemetryRecord = async (cancelSource = cancelTokenSource) => {
    const response = await RemoteApplicationTelemetryActions.getRemoteApplicationTelemetryRecordByIdV2(getAccessToken, cancelSource, id);
    const record = response?.data?.data;
    const metadata = response?.data?.metadata;

    if (isMounted?.current === true && record) {
      setTelemetryMetadata(metadata);
      setTelemetryData(new RemoteApplicationModel(record, metadata, false, getAccessToken, cancelSource, loadData, false, true, setTelemetryData));
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={telemetryData?.getManagementScreenLink()} />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      breadcrumbDestination={"remoteApplicationsDetailView"}
      accessRoleData={accessRoleData}
      metadata={telemetryMetadata}
      dataObject={telemetryData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={
        <RemoteApplicationTelemetryManagementSubNavigationBar
          activeTab={"telemetryViewer"}
        />
      }
      detailPanel={
        <RemoteApplicationDetailPanel
          telemetryData={telemetryData}
          accessRoleData={accessRoleData}/>
      }
    />
  );
}

export default RemoteApplicationDetailView;
