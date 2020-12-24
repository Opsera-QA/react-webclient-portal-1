import React, {useState, useContext, useEffect} from "react";
import { Button, Image } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from 'prop-types'
import { DialogToastContext } from "contexts/DialogToastContext";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import { Row, Col } from "react-bootstrap";
import DropdownList from "react-widgets/lib/DropdownList";
import Model from "../../../core/data_model/model";
import dashboardMetadata from "../dashboards/dashboard-metadata";
import dashboardFilterMetadata from "../dashboards/dashboard-filter-metadata";

function KPIInfoView({data, dashboardData, setShowModal}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dashboard, setDashboard] = useState(dashboardData);
  const [dashboardsList, setDashboardsList] = useState(undefined);
  const [dashboardFilterDto, setDashboardFilterDto] = useState(new Model({...dashboardFilterMetadata.newObjectFields}, dashboardFilterMetadata, false));
  
  useEffect(() => {
    getDashboards();
    if(dashboard) {
      setIsDisabled(false);
    }
    setIsLoading(false);
  }, []);

  const getDashboards = async () => {
    try {
      let dashboards = await dashboardsActions.getAll(dashboardFilterDto, getAccessToken);
      let dashboardOptions = dashboards.data.data.filter(function (d) {return d.configuration.length < 10});
      setDashboardsList(dashboardOptions);
    } catch (err) {
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsLoading(false);
    }
  }

  const addKPIToDashboard = async () => {
    try {
      setIsLoading(true);
      let newDataObj = dashboard;
      let newConfigObj = dashboard.getData("configuration") ? dashboard.getData("configuration") : [];
      // create a custom obj and push to config
      const configObj = {
        kpi_identifier: data.identifier,
        kpi_name: data.name,
        kpi_category: data.category,
        kpi_settings: data.settings,
        filters: data.supported_filters,
        tags: [],
        active: data.active,
      };
      newConfigObj.push(configObj);
      newDataObj.setData("configuration", newConfigObj);
      let response = await dashboardsActions.update(newDataObj, getAccessToken);
      
      if(response.status != 200) {
        let errorMessage = "Error updating dashboard KPI! ";
        toastContext.showErrorDialog(errorMessage);
        return;
      }

      toastContext.showUpdateSuccessResultDialog("Dashboard KPI");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsLoading(false);
    }
 };

  if (data == null) {
    return <></>;
  }

  return (
    <div>
      <div className="flex-container">
        <div className="flex-container-content">
        <div className="h5">{data.name}</div>
          <small className="text-muted">Last updated {formatDistanceToNowStrict(new Date(data.updatedAt))} ago.</small>
            <>
              <div className="mt-3 mr-3">                                    
                <div className="px-2">
                  {/* TODO: placeholder image for now, needs to be changed when done */}
                  {/* <Image src="https://via.placeholder.com/800x500.png" className="kpi-image"/> */}
                  <Image src={data.thumbnailPath} className="kpi-image"/>
                </div>
              </div>

              <div className="mx-3">
                {data.description.length > 1 && <div>
                <div className="text-muted py-2">Description:</div>
                <div className="d-flex flex-wrap">
                 {data.description}
                </div>
                </div>}

                  {data.tools.length > 1 && <div> <div className="text-muted py-2">Tools:</div>
                    <ul className="tags">
                      {data.tools.map((tool,idx)=>{
                        return ( <li key={idx}><span className="tag">{tool}</span></li> )
                      })}
                    </ul>
                    </div>}

                  {data.category.length > 1 && <div> <div className="text-muted py-2">Categories:</div>
                    <ul className="tags">
                      {data.category.map((category,idx)=>{
                        return ( <li key={idx}><span className="tag">{category}</span></li> )
                      })}
                    </ul></div>}

              </div>
            </>
        </div>

        <div className="flex-container-bottom pr-2 mt-4 mb-2" >
         <Row>
           <Col md={9} className="py-1">
              <DropdownList
              data={dashboardsList}
              textField="name"
              defaultValue={dashboardData ? dashboardData : null}
              onChange={(e) => {setIsDisabled(false); setDashboard(new Model(e, dashboardMetadata, false))}}
              />
              </Col>
            <Col md={3} className="py-1">
              <Button disabled={isLoading || isDisabled} onClick={()=> addKPIToDashboard()}>
              {isLoading && (<FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>)}
              Add to dashboard
              </Button>
              </Col>
          </Row>
          </div>
        </div>
      </div>
    )
}

KPIInfoView.propTypes = {
  data: PropTypes.object,
  dashboardData: PropTypes.object,
  setShowModal: PropTypes.func,
};

export default KPIInfoView;