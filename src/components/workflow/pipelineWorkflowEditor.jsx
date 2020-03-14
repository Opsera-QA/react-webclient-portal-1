import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";



const PipelineWorkflowEditor = ({ data, tool, parentCallback }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);

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

  
  const handleSaveClick = (param) => {
    //save actions here
    parentCallback(param);
  };

  const handleCloseClick = (param) => {
    parentCallback(param);
  };


  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <Row>
              <Col sm={8}><h5>Edit Form</h5></Col>
              <Col sm={4} className="text-right">
                <FontAwesomeIcon 
                  icon={faTimes} 
                  className="mr-1"
                  style={{ cursor:"pointer" }}
                  onClick={() => { handleCloseClick(); }} />
              </Col>
            </Row>
            
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="button" onClick={() => { handleSaveClick(); }}>
                Submit
              </Button>
            </Form>

            <div className="text-muted"><small>{JSON.stringify(data)}</small></div>
 
          </>}
      </>
    );
  }
};


PipelineWorkflowEditor.propTypes = {
  data: PropTypes.object,
  tool: PropTypes.string,
  parentCallback: PropTypes.func
};

export default PipelineWorkflowEditor;