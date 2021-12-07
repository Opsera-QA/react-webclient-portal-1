import React, { useEffect, useContext, useState, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import PropTypes from "prop-types";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import SalesforceBackupsAndRollbacksActionableInsightTable from "./SalesforceBackupsAndRollbacksActionableInsightTable";

function SalesforceBackupsAndRollbacksActionableInsightOverlay({ kpiConfiguration, dashboardData, request }) {
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState(undefined);

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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        request,
        kpiConfiguration,
        dashboardTags,
        filterDto,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
      let dataObject = response?.data ? response?.data?.data[0] : [{ data: [], count: [{ count: 0 }] }];
      let newFilterDto = filterDto;

      newFilterDto.setData("totalCount", dataObject[0]?.count[0]?.count);
      setFilterModel({ ...newFilterDto });

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject[0]?.data);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Salesforce Backups & Rollbacks`}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        <SalesforceBackupsAndRollbacksActionableInsightTable
          isLoading={isLoading}
          metrics={metrics}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          loadData={loadData}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceBackupsAndRollbacksActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  request: PropTypes.string,
};

export default SalesforceBackupsAndRollbacksActionableInsightOverlay;
