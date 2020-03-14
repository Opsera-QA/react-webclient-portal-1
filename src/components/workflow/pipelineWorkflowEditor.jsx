import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SourceRepositoryConfig from "./forms/sourceRepository";
import ToolConfigurationSelect from "./forms/toolConfigurationSelect";
 


const PipelineWorkflowEditor = ({ data, parentCallback }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  console.log(data);


  useEffect(() => {    
    //fetchData();
  }, []);

  //fetch tools info based on what's passed to form
  // async function fetchData() {
  //   setLoading(true);
  //   const { getAccessToken } = contextType;
  //   const accessToken = await getAccessToken();

  //   const apiUrl = "/pipelines/workflows";   
  //   try {
  //     const result = await axiosApiService(accessToken).get(apiUrl);
  //     setData(result.data);
  //     setLoading(false);    
  //   }
  //   catch (err) {
  //     console.log(err.message);
  //     setLoading(false);
  //     setErrors(err.message);
  //   }
  // }

  

  const handleCloseClick = (param) => {
    parentCallback(param);
  };

  const callbackFunction = (param) => {
    //save actions here, then call parentCallback to refresh scope
    parentCallback(param);  
  };

  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <Row className="mb-2">
              <Col sm={10}><h5>
                {data.type === "source" ? "Source Repository Configuration" : "Tool Configuration"}</h5></Col>
              <Col sm={2} className="text-right">
                <FontAwesomeIcon 
                  icon={faTimes} 
                  className="mr-1"
                  style={{ cursor:"pointer" }}
                  onClick={() => { handleCloseClick(); }} />
              </Col>
            </Row>
            
            {data.type === "source" ? 
              <SourceRepositoryConfig data={data} parentCallback={callbackFunction} /> : 
              <ToolConfigurationSelect data={data} parentCallback={callbackFunction} />  } 
              

            <div className="text-muted"><small>{JSON.stringify(data)}</small></div>
 
          </>}
      </>
    );
  }
};


PipelineWorkflowEditor.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default PipelineWorkflowEditor;