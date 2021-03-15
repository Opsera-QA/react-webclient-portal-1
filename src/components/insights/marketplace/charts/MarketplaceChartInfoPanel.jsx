import React, {useState, useContext, useEffect, useRef} from "react";
import { Image } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from 'prop-types'
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Model from "core/data_model/model";
import dashboardSelectMetadata from "components/insights/marketplace/charts/dashboard-select-metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import MarketplaceDashboardInput from "components/insights/marketplace/charts/MarketplaceDashboardInput";
import AddToDashboardButton from "components/common/buttons/dashboards/AddToDashboardButton";

function MarketplaceChartInfoPanel({kpiData, dashboardId, closePanel}) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [selectedDashboardData, setSelectedDashboardData] = useState(undefined);
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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (dashboardId) {
        await getDashboardById(cancelSource);
      }
      else {
        setSelectedDashboardData(new Model({...dashboardSelectMetadata?.newObjectFields}, dashboardSelectMetadata, false));
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDashboardById = async (cancelSource = cancelTokenSource) => {
    let response = await dashboardsActions.getDashboardByIdV2(getAccessToken, cancelSource, dashboardId);

    if (isMounted?.current === true && response?.data) {
      setSelectedDashboardData(new Model({dashboard: response.data}, dashboardSelectMetadata, false));
    }
  };

  const getImageField = () => {
    if (kpiData?.thumbnailPath) {
      return (
        <div className="mt-3 px-2">
          <Image src={kpiData.thumbnailPath} className="kpi-image"/>
        </div>
      );
    }
  };

  const getDescriptionField = () => {
    if (kpiData?.description?.length > 1) {
      return (
        <div className="d-flex flex-wrap">
          {kpiData.description}
        </div>
      );
    }
  };

  const getToolsField = () => {
    if (kpiData.tools?.length > 1) {
      return (
        <div className={"py-2"}>
          <ul className="tags">
            {kpiData.tools.map((tool, idx)=>{
              return ( <li key={idx}><span className="tag">{tool}</span></li> )
            })}
          </ul>
        </div>
      );
    }
  };

  const getCategoriesField = () => {
    if (kpiData.category?.length > 1) {
      return (
        <div className={"py-2"}>
          <ul className="tags">
            {kpiData.category.map((category, idx)=>{
              return ( <li key={idx}><span className="tag">{category}</span></li> )
            })}
          </ul>
        </div>
      );
    }
  };

  if (kpiData == null) {
    return null;
  }

  if (isLoading || selectedDashboardData == null) {
    return <LoadingDialog size={"sm"} message={"Loading"} />;
  }

  return (
    <div>
      <div className="h5">{kpiData.name}</div>
      <small className="text-muted">Last updated {formatDistanceToNowStrict(new Date(kpiData.updatedAt))} ago.</small>
      <div className="mx-3">
        {getImageField()}
        {getDescriptionField()}
        {getToolsField()}
        {getCategoriesField()}
      </div>

      <div className="flex-container-bottom pr-2 mt-4 mb-2">
        <Row className={"d-flex"}>
          <Col md={12} className="py-1">
            <MarketplaceDashboardInput setDataObject={setSelectedDashboardData} dataObject={selectedDashboardData}/>
          </Col>
        </Row>
        <SaveButtonContainer>
          <div className="ml-auto">
            <AddToDashboardButton closePanel={closePanel} kpiData={kpiData} selectedDashboardData={selectedDashboardData} />
          </div>
        </SaveButtonContainer>
      </div>
    </div>
  );
}

MarketplaceChartInfoPanel.propTypes = {
  kpiData: PropTypes.object,
  dashboardId: PropTypes.string,
  closePanel: PropTypes.func
};

export default MarketplaceChartInfoPanel;