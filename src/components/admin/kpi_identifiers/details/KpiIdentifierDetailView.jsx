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

function KpiIdentifierDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [kpiData, setKpiData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
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

  const getKpi = async (cancelSource = cancelTokenSource) => {
    const response = await KpiActions.getKpiById(getAccessToken, cancelSource, id);

    if (isMounted?.current === true && response?.data) {
      setKpiData(new Model(response?.data, kpiIdentifierMetadata, false));
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess) && id) {
        await getKpi(cancelSource);
      }
    }
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/kpis"} />
        </div>
        <div>
          {meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, accessRoleData) && (
            <ActionBarDeleteButton2 dataObject={kpiData} relocationPath={"/admin/kpis"} handleDelete={handleDelete} />
          )}
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

  return (
    <DetailScreenContainer
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      breadcrumbDestination={"kpiDetailView"}
      accessRoleData={accessRoleData}
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
