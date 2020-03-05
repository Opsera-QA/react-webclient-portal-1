import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";
import InfoDialog from "../../components/common/info";
import ErrorDialog from "../../components/common/error";
import PipelineDashboard from "../../components/dashboard/Pipeline";
import SecOpsDashboard from "../../components/dashboard/SecOps";
import LogsDashboard from "../../components/dashboard/Logs";
import ToolsDashboard from "../../components/dashboard/Tools";
import LoadingDialog from "../../components/common/loading";

const PERSONAS = [ { value: "0", label: "Developer" }, { value: "1", label: "Security" }, { value: "2", label: "Operations" }, { value: "3", label: "VP of Engineering" }];

function DashboardHome() {
  const contextType = useContext(AuthContext);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState("pipeline");
  const [persona, setPersona] = useState();
  const [loading, setLoading] = useState(false);
  

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/settings", {}, accessToken);
    const result = await apiCall.get()
      .catch(function (error) {
        setErrors(error.toJSON());
      });
      
    setLoading(false);
    
    if (result !== undefined && result.data.length > 0) {
      setPersona(result.data[0].defaultPersona);
      setData(result.data[0]);
    }
  };

  useEffect( () => {
    getApiData();
  }, []);

  const handleTabClick = param => e => {
    e.preventDefault();
    setSelection(param);
  };

  const handleSelectPersonaChange = (selectedOption) => {
    setPersona(selectedOption.value);
  };

 
  return (
    <div className="mb-3 max-charting-width">
      { loading && <LoadingDialog size="lg" />}
      <div className="mt-2 mb-3">
        { hasError && <ErrorDialog error={hasError} /> }

        <div className="max-content-width mt-3 mb-4">
          <h4>My Dashboard</h4>
          <p>OpsERA offers the best, easy to use solutions for deploying, monitoring and managing your entire automation and workflow 
                pipelines, enabling organizations to build optimized and efficient DevOps based projects.</p>               
        </div>
           
        { data.length == 0 && <InfoDialog message="Your Analytics Profile has not been enabled for this account.  Please go to the Analytics page on the left menu and enable your settings in order to use the Dashboards." /> }

        <Row>
          <Col sm={8}>
            <ul className="nav nav-pills ml-2 mb-2">
              <li className="nav-item">
                <a className={"nav-link " + (selection === "pipeline" ? "active" : "")} onClick={handleTabClick("pipeline")} href="#">Pipeline</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (selection === "secops" ? "active" : "")} onClick={handleTabClick("secops")} href="#">SecOps</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (selection === "logs" ? "active" : "")} onClick={handleTabClick("logs")} href="#">Logs</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link disabled " + (selection === "tools" ? "active" : "")} onClick={handleTabClick("tools")} href="#">Tools</a>
              </li>
            </ul></Col>
          <Col sm={4}>
            <Select
              className="basic-single mr-2"
              menuPortalTarget={document.body}
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              classNamePrefix="select"
              defaultValue={persona ? PERSONAS[parseInt(persona)] : PERSONAS[0]}
              isDisabled={false}
              isClearable={false}
              isSearchable={true}
              name="PERSONA-SELECT"
              options={PERSONAS}
              onChange={handleSelectPersonaChange}
            />
          </Col>
        </Row>
            
        {(() => {
          switch (selection) {
          case "pipeline":
            return <PipelineDashboard persona={persona} />;
          case "secops":
            return <SecOpsDashboard persona={persona} />;
          case "logs":
            return <LogsDashboard persona={persona} />;
          case "tools":
            return <ToolsDashboard persona={persona} />;
          default:
            return null; 
          }
        })()}
      </div>
    </div>
  );
  
}

export default DashboardHome;