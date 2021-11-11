import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import kpiConfigurationMetadata from "components/admin/kpi_editor/kpiConfiguration.metadata";
import { DialogToastContext } from "contexts/DialogToastContext";
import KpiActions from "components/admin/kpi_editor/kpi-editor-actions";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import KpiDetailPanel from "components/admin/kpi_editor/kpi_detail_view/KpiDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";

function KpiDetailView() {
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
      setKpiData(new Model(response?.data, kpiConfigurationMetadata, false));
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

  return (
    <DetailScreenContainer
     roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      breadcrumbDestination={"kpiDetailView"}
      accessRoleData={accessRoleData}
      metadata={kpiConfigurationMetadata}
      dataObject={kpiData}
      isLoading={isLoading || !accessRoleData}
      actionBar={getActionBar()}
      detailPanel={<KpiDetailPanel setKpiData={setKpiData} kpiData={kpiData} accessRoleData={accessRoleData} />}
    />
  );
}

export default KpiDetailView;
