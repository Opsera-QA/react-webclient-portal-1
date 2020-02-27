import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import ConfigurationsForm from "./configurationsForm";
import { Form, Button } from "react-bootstrap";
import "./analytics.css";
import "./charts/charts.css";
import ActivityLogView from "../analytics/logs/activityLogView";
import Select from "react-select";

const FILTER = [{ value: "pipeline", label: "Pipeline" }, { value: "metricbeat", label: "MetricBeat" }, { value: "twistlock", label: "TwistLock" }];

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
      .then(function (response) {
        setData(response.data[0]);
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

      <h4>Analytics</h4>
      <p>Access all available logging, reports and configurations around the OpsERA Analytics Platform.
        Update your settings or configure your profile and logging tools in the settings below.</p>

      <div className="p-2 mt-1">
        {error && <ErrorDialog error={error} />}
        <ConfigurationsForm settings={data} token={token} />
      </div>

      {(data) &&
        <div className="mt-1">
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
        </div>}


      <div className="mt-3 p-2">
        <ActivityLogView searchQuery={query} filterType={filterType} />
      </div>

    </div>
  );
}

Analytics.propTypes = {
  tools: PropTypes.object
};

export default Analytics;
