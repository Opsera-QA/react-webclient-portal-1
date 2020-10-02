import React, { useState, useEffect, useContext, useMemo } from "react";
import KpiSummaryPanel from "./KpiSummaryPanel";
import KpiDetailPanel from "./KpiDetailPanel";
import { Link, useParams } from "react-router-dom";
import KpiTagsActions from "../kpi-editor-actions";
import { AuthContext } from "contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import kpiMetaData from "./kpi-form-fields";
import {faFileInvoice} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailViewContainer from "../../../common/panels/detail_view_container/DetailViewContainer";

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
      toastContext.showLoadingErrorDialog(error);
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

  return (
    <DetailViewContainer
      breadcrumbDestination={"kpiDetailView"}
      title={kpiData != null ? `KPI Details [${kpiData["name"]}]` : undefined}
      titleIcon={faFileInvoice}
      isLoading={isLoading}
      summaryPanel={<KpiSummaryPanel kpiData={kpiData} setKpiData={setKpiData}/>}
      detailPanel={<KpiDetailPanel setKpiData={setKpiData} kpiData={kpiData} />}
    />
  );
}

export default KpiDetailView;