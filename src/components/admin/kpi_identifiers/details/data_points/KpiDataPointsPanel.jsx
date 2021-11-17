import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import { meetsRequirements, ROLE_LEVELS } from "components/common/helpers/role-helpers";
import axios from "axios";
import KpiDataPointActions from "components/admin/kpi_identifiers/details/data_points/kpiDataPoint.actions";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import KpiDataPointsTable from "components/admin/kpi_identifiers/details/data_points/KpiDataPointsTable";
import KpiDataPointEditorPanel from "components/admin/kpi_identifiers/details/data_points/KpiDataPointEditorPanel";

function KpiDataPointsPanel({kpiId}) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [dataPoints, setDataPoints] = useState([]);
  const [dataPointMetadata, setDataPointMetadata] = useState(undefined);
  const [dataPointRoleDefinitions, setDataPointRoleDefinitions] = useState(undefined);
  const [dataPointModel, setDataPointModel] = useState(undefined);
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
    setDataPoints([]);

    if (isMongoDbId(kpiId) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  },[kpiId]);

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
    const userRoleAccess = await getAccessRoleData();
    if (isMounted.current === true && meetsRequirements(ROLE_LEVELS.OPSERA_ADMINISTRATORS, userRoleAccess)) {
      setAccessRoleData(userRoleAccess);
      await getDataPoints(cancelSource);
    }
  };

  const getDataPoints = async (cancelSource = cancelTokenSource) => {
    const response = await KpiDataPointActions.getKpiDataPointsV2(getAccessToken, cancelSource, kpiId);
    const dataPoints = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(dataPoints)) {
      setDataPoints(dataPoints);
      setDataPointMetadata(response?.data?.metadata);
      setDataPointRoleDefinitions(response?.data?.roles);
    }
  };

  const closeEditorPanel = async () => {
    setDataPointModel(null);
    await loadData();
  };

  if (dataPointModel != null) {
    return (
      <KpiDataPointEditorPanel
        dataPointModel={dataPointModel}
        closeEditorPanel={closeEditorPanel}
      />
    );
  }

  return (
    <KpiDataPointsTable
      isLoading={isLoading}
      loadData={loadData}
      isMounted={isMounted}
      dataPoints={dataPoints}
      dataPointMetadata={dataPointMetadata}
      dataPointRoleDefinitions={dataPointRoleDefinitions}
      setDataPointModel={setDataPointModel}
      accessRoleData={accessRoleData}
      kpiId={kpiId}
      cancelTokenSource={cancelTokenSource}
    />
  );
}

KpiDataPointsPanel.propTypes = {
  kpiId: PropTypes.string,
};

export default KpiDataPointsPanel;
