import React, {useState, useContext, useEffect} from "react";
import { Button, Image } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from 'prop-types'
import { DialogToastContext } from "contexts/DialogToastContext";
import dashboardsActions from "../../insights/dashboards-actions";

function KPIInfoView({data, dashboardData, setShowModal}) {
  
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  
  useEffect(() => {
    if(dashboardData) {
      setIsDisabled(false);
    }
    setIsLoading(false);
  }, []);

  const addKPIToDashboard = async () => {
    try {
      setIsLoading(true);
      let newDataObj = dashboardData;
      let newConfigObj = dashboardData.getData("configuration") ? dashboardData.getData("configuration") : [];
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
                <div className="text-muted py-2">Description:</div>
                <div className="d-flex flex-wrap">
                 {data.description}
                </div>

                  <div className="text-muted py-2">Tools:</div>
                    <ul className="tags">
                      {data.tools.map((tool,idx)=>{
                        return ( <li key={idx}><span className="tag">{tool}</span></li> )
                      })}
                    </ul>

                  <div className="text-muted py-2">Categories:</div>
                    <ul className="tags">
                      {data.category.map((category,idx)=>{
                        return ( <li key={idx}><span className="tag">{category}</span></li> )
                      })}
                    </ul>

              </div>
            </>
        </div>

        <div className="flex-container-bottom pr-2 mt-4 mb-2 text-right">
         {/* TODO : add/remove from dashboard buttons goes here */}
          <Button disabled={isLoading || isDisabled} onClick={()=> addKPIToDashboard()}>
            {isLoading && (
                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
            )}
           Add to dashboard
          </Button>
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