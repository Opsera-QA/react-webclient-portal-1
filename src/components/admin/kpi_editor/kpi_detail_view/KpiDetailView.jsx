import React, { useState, useEffect, useContext, useMemo } from "react";
import KpiSummaryPanel from "./KpiSummaryPanel";
import KpiDetailPanel from "./KpiDetailPanel";
import { useParams } from "react-router-dom";
import KpiTagsActions from "../kpi-editor-actions";
import { AuthContext } from "contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import kpiMetaData from "./kpi-form-fields";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import ActionBarContainer from "../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "../../../common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "../../../common/panels/detail_view_container/DetailScreenContainer";
import KpiActions from "../kpi-editor-actions";

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
      if (!error.message.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getKpi = async (tagId) => {
    const response = await KpiTagsActions.get(tagId, getAccessToken);
    setKpiData(new Model(response.data, kpiMetaData, false));
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
      managementViewIcon={faFileInvoice}
      type={"KPI Configuration"}
      titleIcon={faFileInvoice}
      activeField={"active"}
      dataObject={kpiData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<KpiDetailPanel setKpiData={setKpiData} kpiData={kpiData} />}
    />
  );
}

export default KpiDetailView;