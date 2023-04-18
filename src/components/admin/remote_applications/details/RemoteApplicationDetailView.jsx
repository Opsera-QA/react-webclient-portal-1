import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import RemoteApplicationTelemetryActions from "components/admin/remote_applications/remote-application-actions";
import RemoteApplicationDetailPanel
  from "components/admin/remote_applications/details/RemoteApplicationDetailPanel";
import RemoteApplicationModel from "components/admin/remote_applications/remoteApplication.model";
import RemoteApplicationTelemetryManagementSubNavigationBar
  from "components/admin/remote_applications/RemoteApplicationTelemetryManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function RemoteApplicationDetailView() {
  const { id } = useParams();
  const [telemetryData, setTelemetryData] = useState(undefined);
  const [telemetryMetadata, setTelemetryMetadata] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    accessRoleData,
    getAccessToken,
    toastContext,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  },[]);

  const loadData = async () => {
    setTelemetryData(undefined);
    try {
      if (isOpseraAdministrator !== true) {
        return;
      }

      setIsLoading(true);
      await getTelemetryRecord();
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

  const getTelemetryRecord = async () => {
    const response = await RemoteApplicationTelemetryActions.getRemoteApplicationTelemetryRecordByIdV2(getAccessToken, cancelTokenSource, id);
    const record = response?.data?.data;
    const metadata = response?.data?.metadata;

    if (isMounted?.current === true && record) {
      setTelemetryMetadata(metadata);
      setTelemetryData(new RemoteApplicationModel(record, metadata, false, getAccessToken, cancelTokenSource, loadData, false, true, setTelemetryData));
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

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"remoteApplicationsDetailView"}
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
