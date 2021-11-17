import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel.jsx";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import KpiDataPointModel from "components/admin/kpi_identifiers/details/data_points/kpiDataPoint.model";
import KpiDataPointEditorPanel from "components/admin/kpi_identifiers/details/data_points/KpiDataPointEditorPanel";

function NewKpiDataPointOverlay(
  {
    loadData,
    isMounted,
    dataPointMetadata,
    kpiId
  }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [dataPointModel, setDataPointModel] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    if (dataPointMetadata != null) {
      createNewDataPointModel(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
    };
  }, [dataPointMetadata]);

  const createNewDataPointModel = async (cancelSource = cancelTokenSource) => {
    try {
      const accessRoleData = await getAccessRoleData();
      const newDataPointModel = new KpiDataPointModel(
        {...dataPointMetadata.newObjectFields},
        dataPointMetadata,
        true,
        getAccessToken,
        cancelSource,
        loadData,
        accessRoleData,
        [],
        setDataPointModel,
        kpiId,
      );
      setDataPointModel(newDataPointModel);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const closePanel = () => {
    if (isMounted?.current === true && loadData != null) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (dataPointModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      objectType={dataPointModel?.getType()}
      loadData={loadData}
      closePanel={closePanel}
      isMounted={isMounted}
    >
      <KpiDataPointEditorPanel
        dataPointModel={dataPointModel}
        closeEditorPanel={closePanel}
      />
    </CreateCenterPanel>
  );
}

NewKpiDataPointOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  dataPointMetadata: PropTypes.object,
  kpiId: PropTypes.string,
};

export default NewKpiDataPointOverlay;
