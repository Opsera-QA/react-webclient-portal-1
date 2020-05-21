import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";  
import { Form, Alert, Table, Button } from "react-bootstrap";
import { format } from "date-fns";
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import DropdownList from "react-widgets/lib/DropdownList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";


function ToolList () {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renderForm, setRenderForm] = useState(false);
  const [filter, setFilter] = useState({});
  const [filterData, setFilterData] = useState({});
  

  useEffect(()=> {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        //await getApiData();
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);     
      controller.abort();      
    };
  }, []);

  const getApiData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const params = {};
    const apiUrl = "/applications";
    
    try {
      const result = await axiosApiService(accessToken).get(apiUrl, { params });    
      //const filteredApps = result.data.filter((app) => { return app.type !== "pipeline"; }); //we don't want the legacy pipeline apps to show.
      setData(result.data);
      setLoading(false);
    }
    catch (err) {
      setErrors(err);
      setLoading(false);
    }
  };

  const handleDropdownChange = (selectedOption) => {
    console.log(selectedOption);
    setFilter(selectedOption);
  };


  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <div className="mt-3">

       

        {!loading && data && data.length === 0 ? 
          <>
            <div className="mt-3 max-content-module-width-50">
              <Alert variant="secondary">
                No tools are currently registered for this organization.
              </Alert>
            </div>
          </>:
          <>
            <div className="mt-3 max-content-module-width-50 text-right">
              <Form>
                <Form.Group>

                  <Form.Label>Filter</Form.Label>
                  {renderForm ?
                    <DropdownList
                      data={filterData} 
                      valueField='name'
                      busy={loading} 
                      textField='name'
                      onChange={handleDropdownChange}             
                    /> : null }

                </Form.Group>
              </Form>
            </div> 

            
            <div className="mt-1">
              <Tools data={data} />
            </div> 
          </>
        }
        
        
      </div>
    );
  }
}



const Tools = ({ data }) => {
  
  console.log(data);
  return (
    <Table striped bordered hover className="table-sm" style={{ fontSize:"small" }}>
      <thead>
        <tr>
          <th style={{ width: "15%" }}>Tool</th>
          <th className="text-center" style={{ width: "5%" }}>Port</th>
          <th className="text-center" style={{ width: "5%" }}>Version</th>                
          <th className="text-center" style={{ width: "10%" }}>Status</th>
          <th className="text-center" style={{ width: "10%" }}>Install Date</th>
          <th style={{ width: "30%" }}>URL</th>
          <th style={{ width: "25%" }}>DNS</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((item, idx) => (
          <tr key={idx} >
            <td>{item["name"]}<br /><span className="text-muted small">{item["id"]}</span></td>
            <td className="text-center">{item["port"]}</td>
            <td className="text-center">{item["versionNumber"]}</td>
            <td className="text-center">{item["toolStatus"]}</td>
            <td className="text-center">{format(new Date(item["installationDate"]), "yyyy-MM-dd")}</td>   
            <td>{item["toolURL"]}</td>
            <td>{item["dnsName"]}</td>
          </tr>
        ))}
      </tbody>
    </Table>

  );
};


Tools.propTypes = {
  data: PropTypes.array
};


export default ToolList;
