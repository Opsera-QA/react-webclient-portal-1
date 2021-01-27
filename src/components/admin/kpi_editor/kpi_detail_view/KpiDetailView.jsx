import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import Model from "core/data_model/model";
import kpiMetaData from "components/admin/kpi_editor/kpi-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import KpiActions from "components/admin/kpi_editor/kpi-editor-actions";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import KpiDetailPanel from "components/admin/kpi_editor/kpi_detail_view/KpiDetailPanel";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";

function KpiDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [kpiData, setKpiData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getKpi = async (tagId) => {
    const response = await KpiActions.get(tagId, getAccessToken);

    if (response?.data) {
      setKpiData(new Model(response?.data, kpiMetaData, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getKpi(id);
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
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"kpiDetailView"}
      title={kpiData != null ? `KPI Configuration Details [${kpiData.getData("name")}]` : undefined}
      managementViewLink={"/admin/kpis"}
      managementTitle={"KPI Management"}
      type={"KPI Configuration"}
      metadata={kpiMetaData}
      dataObject={kpiData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<KpiDetailPanel setKpiData={setKpiData} kpiData={kpiData} />}
    />
  );
}

export default KpiDetailView;