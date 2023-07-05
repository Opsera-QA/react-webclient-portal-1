import React, { useState, useContext, useMemo,useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
  import Model from "../../../../../../core/data_model/model";
  import actionableInsightsGenericChartFilterMetadata
      from "../../../generic_filters/actionableInsightsGenericChartFilterMetadata";  
import GitlabCommitsByAuthorActionableTable from "./GitlabCommitsByAuthorActionableTable";
import gitlabActions from "../../gitlab.action";

function GitlabCommitsByAuthorOverlay({ kpiConfiguration, dashboardData,icon }) { 
const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [totalCount, setTotalCount] = useState([]);
    const [chartData, setChartData] =
        useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [filterModel, setFilterModel] = useState(
        new Model(
            { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
            actionableInsightsGenericChartFilterMetadata,
            false
        )
    );
 

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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    
    try {
      setIsLoading(true);
      let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;

      const response = await gitlabActions.getGitlabCommitUser(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        filterDto,
      );
      let dataObject = response?.data ? response?.data?.data?.gitlabCommitUser?.data[0]?.data : [];
      let totalCount = response?.data? response?.data?.data?.gitlabCommitUser?.data[0]?.count[0]?.count : [];
      if (isMounted?.current === true && dataObject) {
          setMetrics(dataObject);
          setTotalCount(totalCount);
          let newFilterDto = filterDto;
          newFilterDto.setData("totalCount", totalCount);
          setFilterModel({ ...newFilterDto });
    }
    }
    catch (error) {
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
    toastContext.clearInfoOverlayPanel();
  };

 
const getBody =() => {
  return (
    <div className={"p-3"}>
    <GitlabCommitsByAuthorActionableTable
        isLoading={isLoading}
        data={metrics}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        loadData={loadData}
        tableTitleIcon={icon}
    />
  </div> )
 }
  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Gitlab Total Commits By Author`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>

  );
}

GitlabCommitsByAuthorOverlay.propTypes = {
  metrics: PropTypes.array,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  start: PropTypes.string,
  end: PropTypes.string,
  range: PropTypes.string,
  type: PropTypes.string,
  
};


export default GitlabCommitsByAuthorOverlay;