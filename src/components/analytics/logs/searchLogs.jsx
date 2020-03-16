import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import { Form, Button, Alert, Table } from "react-bootstrap";
import Moment from "react-moment";
import Modal from "../../common/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import "./logs.css";


const FILTER = [{ value: "pipeline", label: "Pipeline" }, { value: "metricbeat", label: "MetricBeat" }, { value: "twistlock", label: "TwistLock" }, { value: "blueprint", label: "Build Blueprint" }];

function SearchLogs ( ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("pipeline");

  const handleFormSubmit = e => {
    e.preventDefault();
    setData([]);    
    fetchData(searchTerm, filterType);    
  };

  const cancelSearchClicked = e => {
    e.preventDefault();
    setData([]);
    setSearchTerm("");
  };

  const handleSelectChange = (selectedOption) => {
    setData([]);
    setFilterType(selectedOption.value);
  };

  const fetchData = async (search, filter) => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const urlParams = {
      search: search,
      filter: filter
    };
    const apiCall = new ApiService("/analytics/search", urlParams, accessToken);
    const result = await apiCall.get()
      .catch(function (error) {
        setErrors(error.toJSON());
      });
    
    let searchResults = result.data.hasOwnProperty("hits") && result.data.hits.hasOwnProperty("hits") ? result.data.hits.hits : [];
    setNoResults(searchResults.length === 0);
    setData(searchResults);
    setLoading(false);
  };

  
  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        <div className="max-content-width">
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

        {loading && <LoadingDialog size="sm" />}


        <MapLogData data={data} type={filterType} />

        {(!loading && noResults && searchTerm.length > 0) && 
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center">
                <div className="h6">No Results found for {searchTerm}</div>   
              </div>
            </div>
          </div> 
        }
      </>
    );
  }
}


const MapLogData = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const { data, type } = props;

  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };
  if (type === "pipeline" && data.length > 0) { 
    console.log(data);
    return (
      <>
        <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Project</th>
              <th style={{ width: "45%" }}>Entry</th>
              <th style={{ width: "20%" }}>Date</th>
              <th className="text-center" style={{ width: "5%" }}>Build Number</th>
              <th className="text-center" style={{ width: "5%" }}>Source Host</th>
              <th className="text-center" style={{ width: "5%" }}>Source</th>
            </tr>
          </thead>
          <tbody>
            
            {data.map((item, idx) => (
              <tr key={idx} >
                <td className="force-text-wrap">{typeof(item._source.data["projectName"]) !== "undefined" ? item._source.data["projectName"] : null}</td>
                <td className="force-text-wrap">{item._index}: {item._source.message ? item._source.message[0] : null}
                  <FontAwesomeIcon icon={faSearchPlus}
                    className="ml-1"
                    size="xs"
                    style={{ cursor: "pointer" }}
                    onClick={() => { handleClick(item._source.data); }} /></td> 
                <td><Moment format="MMM Do YYYY, h:mm:ss a" date={typeof(item._source["@timestamp"]) !== "undefined" ? item._source["@timestamp"] : null} /></td>          
                <td className="text-center">{typeof(item._source.data["buildNum"]) !== "undefined" ? item._source.data["buildNum"] : null}</td>      
                <td className="text-center">{typeof(item._source["source_host"]) !== "undefined" ? item._source["source_host"] : null}</td>
                <td className="text-muted text-center">{typeof(item._source["source"]) !== "undefined" ? item._source["source"] : null}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {showModal ? <Modal header="Log Details"
          message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
          button="OK"
          size="lg"
          handleCancelModal={() => setShowModal(false)}
          handleConfirmModal={() => setShowModal(false)} /> : null}
      </>
    );
  } else if (type === "blueprint" && data.length > 0) {
    return (
      <>
        <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Build</th>
              <th style={{ width: "5%" }}>Environment</th>
              <th style={{ width: "20%" }}>Date</th>
              <th style={{ width: "10%" }}>Tool</th>
              <th style={{ width: "30%" }}>Message</th>
              <th style={{ width: "25%" }}>Git Commit ID</th>
              <th style={{ width: "5%" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            
            {data.map((item, idx) => (
              <tr key={idx} >
                <td>{item["build_number"]}
                  <FontAwesomeIcon icon={faSearchPlus}
                    className="ml-1"
                    size="xs"
                    style={{ cursor: "pointer" }}
                    onClick= {() => { handleClick(item); }} /></td>
                <td className="force-text-wrap upper-case-all">{item["Release Environment"]}</td> 
                <td><Moment format="MMM Do YYYY, h:mm:ss a" date={item["time"]} /></td>                
                <td className="upper-case-first">{item["tool"]}</td>
                <td className="force-text-wrap">{item["message"]}</td>
                <td className="force-text-wrap">{item["Git Commit ID"]}</td>
                <td className="upper-case-all">{item["status"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {showModal ? <Modal header="Log Details"
          message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
          button="OK"
          size="lg"
          handleCancelModal={() => setShowModal(false)}
          handleConfirmModal={() => setShowModal(false)} /> : null}
      </>
    );
  }
  else {
    return (
      <>
        {data.map((item, idx) => (
          <Alert key={idx} variant="light">
            {JSON.stringify(item)}
          </Alert>
        ))}
      </>
    );
  }
};

MapLogData.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string
};


export default SearchLogs;

