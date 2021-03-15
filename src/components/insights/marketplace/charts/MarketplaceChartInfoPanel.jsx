import React, {useState, useContext, useEffect, useRef} from "react";
import { Button, Image } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from 'prop-types'
import { DialogToastContext } from "contexts/DialogToastContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Model from "core/data_model/model";
import dashboardSelectMetadata from "components/insights/marketplace/charts/dashboard-select-metadata";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import LoadingDialog from "components/common/status_notifications/loading";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import MarketplaceDashboardInput from "components/insights/marketplace/charts/MarketplaceDashboardInput";

function MarketplaceChartInfoPanel({kpiData, dashboardId, handleClose}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [dashboardSelectData, setDashboardSelectData] = useState(undefined);
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
        setDashboardSelectData(new Model({...dashboardSelectMetadata?.newObjectFields}, dashboardSelectMetadata, false));
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
      setDashboardSelectData(new Model({dashboard: response.data}, dashboardSelectMetadata, false));
    }
  };
  
  const addKPIToDashboard = async () => {
    try {
      setIsSaving(true);

      let newDashboard = new Model(dashboardSelectData.getData("dashboard"), dashboardMetadata, false);
      let newConfigObj = newDashboard.getData("configuration");

      const configObj = {
        kpi_identifier: kpiData.identifier,
        kpi_name: kpiData.name,
        kpi_category: kpiData.category,
        kpi_settings: kpiData.settings,
        filters: kpiData.supported_filters,
        tags: [],
        active: kpiData.active,
      };

      newConfigObj.push(configObj);

      newDashboard.setData("configuration", newConfigObj);
      await dashboardsActions.update(newDashboard, getAccessToken);

      toastContext.showUpdateSuccessResultDialog("Dashboard KPI");
      handleClose();
    } catch (error) {
      if (isMounted?.current === true) {
        console.log(error);
        toastContext.showServiceUnavailableDialog();
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
 };

  const getImageField = () => {
    if (kpiData?.thumbnailPath) {
      return (
        <div className="mt-3">
          <div className="px-2">
            {/* TODO: placeholder image for now, needs to be changed when done */}
            {/* <Image src="https://via.placeholder.com/800x500.png" className="kpi-image"/> */}
            <Image src={kpiData.thumbnailPath} className="kpi-image"/>
          </div>
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

  if (isLoading || dashboardSelectData == null) {
    return <LoadingDialog size={"sm"} message={"Loading"} />;
  }

  return (
    <div>
      <div className="flex-container">
        <div className="flex-container-content">
        <div className="h5">{kpiData.name}</div>
          <small className="text-muted">Last updated {formatDistanceToNowStrict(new Date(kpiData.updatedAt))} ago.</small>
            <>
              <div className="mx-3">
                {getImageField()}
                {getDescriptionField()}
                {getToolsField()}
                {getCategoriesField()}
              </div>
            </>
        </div>

        <div className="flex-container-bottom pr-2 mt-4 mb-2" >
         <Row className={"d-flex"}>
           <Col md={12} className="py-1">
             <MarketplaceDashboardInput setDataObject={setDashboardSelectData} dataObject={dashboardSelectData} />
           </Col>
         </Row>
          <SaveButtonContainer>
            <div className="ml-auto">
              <Button
                disabled={isSaving || dashboardSelectData?.getData("dashboard")?.configuration == null || dashboardSelectData?.getData("dashboard")?.configuration.length >= 10}
                onClick={() => addKPIToDashboard()}>
                {isSaving && (<FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>)}
                Add to dashboard
              </Button>
            </div>
          </SaveButtonContainer>
        </div>
        </div>
      </div>
  );
}

MarketplaceChartInfoPanel.propTypes = {
  kpiData: PropTypes.object,
  dashboardId: PropTypes.string,
  handleClose: PropTypes.func
};

export default MarketplaceChartInfoPanel;