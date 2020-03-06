import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import ConfigurationsForm from "./configurationsForm";
import { Form, Button, Alert } from "react-bootstrap";
import "./analytics.css";
import "./charts/charts.css";
import ActivityLogView from "../analytics/logs/activityLogView";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const FILTER = [{ value: "pipeline", label: "Pipeline" }, { value: "metricbeat", label: "MetricBeat" }, { value: "twistlock", label: "TwistLock" }, { value: "blueprint", label: "Build Blueprint" }];
function Analytics() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("pipeline");

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleFormSubmit = e => {
    e.preventDefault();
    setQuery(searchTerm);    
  };

  const cancelSearchClicked = e => {
    e.preventDefault();
    setQuery("");
    setSearchTerm("");
  };

  const handleSelectChange = (selectedOption) => {
    setFilterType(selectedOption.value);
  };

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    setToken(accessToken);

    const apiCall = new ApiService("/analytics/settings", {}, accessToken);
    apiCall.get()
      .then(function (result) {
        setData(result.data);
        setLoading(false);        
      })
      .catch(function (error) {
        setLoading(false);
        setErrors(error);
        console.log(`Error Reported: ${error}`);
      });
  }

  return (
    <div className="mt-3 max-content-width">
      {loading && <LoadingDialog />}
      {!loading &&
      <>
        <h4>Analytics and Logs</h4>
        <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available 
         logging, reports and configurations around the OpsERA Analytics Platform or search your 
        currently configured logs repositories below.</p>

        {data == undefined ? 
          <div className="p-2 mt-1">
            {error && <ErrorDialog error={error} />}
            <ConfigurationsForm settings={data} token={token} />
          </div>
          :
          data.esSearchApi !== null ?
            <>
              <div className="pr-2 mt-1 text-right">
                <Link to='/profile'><FontAwesomeIcon icon={faCog} fixedWidth size="lg" /></Link>
              </div> 

              <div>
                <Form onSubmit={handleFormSubmit}>
                  <div className="d-flex mt-3">
                    <div className="p-2 flex-grow-1">
                      <Form.Control placeholder="Search logs" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="p-2 flex-grow-1">
                      <Select
                        className="basic-single"
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        classNamePrefix="select"
                        defaultValue={filterType ? FILTER[FILTER.findIndex(x => x.value ===filterType)] : FILTER[0]}
                        isDisabled={false}
                        isClearable={false}
                        isSearchable={true}
                        name="FILTER-SELECT"
                        options={FILTER}
                        onChange={handleSelectChange}
                      />
                    </div>
                    <div className="p-2">
                      <Button variant="primary" type="submit">Search</Button>
                      <Button variant="outline-secondary" className="ml-2" type="button" onClick={cancelSearchClicked}>Cancel</Button>
                    </div>
                  </div>
                </Form>
              </div>

              <div className="mt-3 p-2">
                <ActivityLogView searchQuery={query} filterType={filterType} />
              </div>
            </>
            :
            <div style={{ height: "200px" }}>
              <div className="row h-100">
                <div className="col-sm-12 my-auto text-center">
                  <Alert variant="info">
                    An OpsERA Analytics instance must be spun up and configured with your pipeline tools in order to leverage these features.
                  </Alert>
                </div>
              </div>
            </div>          
        }

      
      </>}
    </div>
  );
}

Analytics.propTypes = {
  tools: PropTypes.object
};

export default Analytics;
