import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import kpiIdentifierMetadata from "components/admin/kpi_identifiers/kpiIdentifier.metadata";
import { DialogToastContext } from "contexts/DialogToastContext";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import KpiIdentifierDetailPanel from "components/admin/kpi_identifiers/details/KpiIdentifierDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";
import KpiIdentifierManagementSubNavigationBar
  from "components/admin/kpi_identifiers/KpiIdentifierManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";

function KpiIdentifierDetailView() {
  const [kpiData, setKpiData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const {
    accessRoleData,
    getAccessToken,
    toastContext,
    cancelTokenSource,
    isMounted,
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
    try {
      setIsLoading(true);
      await getKpi();
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getKpi = async () => {
    const response = await KpiActions.getKpiById(getAccessToken, cancelTokenSource, id);

    if (isMounted?.current === true && response?.data) {
      setKpiData(new Model(response?.data, kpiIdentifierMetadata, false));
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/kpis"} />
        </div>
        <div>
          <ActionBarDeleteButton2 dataObject={kpiData} relocationPath={"/admin/kpis"} handleDelete={handleDelete} />
        </div>
      </ActionBarContainer>
    );
  };

  const handleDelete = async () => {
    return await KpiActions.deleteKpi(kpiData, getAccessToken);
  };

  const getDetailPanel = () => {
    return (
      <KpiIdentifierDetailPanel
        setKpiData={setKpiData}
        kpiData={kpiData}
        accessRoleData={accessRoleData}
      />
    );
  };

  if (isOpseraAdministrator !== true) {
    return null;
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"kpiDetailView"}
      metadata={kpiIdentifierMetadata}
      navigationTabContainer={<KpiIdentifierManagementSubNavigationBar activeTab={"kpiIdentifierViewer"} />}
      dataObject={kpiData}
      isLoading={isLoading || !accessRoleData}
      actionBar={getActionBar()}
      detailPanel={getDetailPanel()}
    />
  );
}

export default KpiIdentifierDetailView;
