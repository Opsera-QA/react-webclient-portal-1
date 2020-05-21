import React, { useContext, useState, useEffect } from "react";
//import { Row, Col, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";

function NewTool() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {    
    //fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${data._id}/update`;   
    try {
      await axiosApiService(accessToken).get(apiUrl);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  const callbackFetchData = (action) => {
    console.log("Action: ", action);
    fetchData();    
  };

  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <div className="mt-3 max-content-width">
              CONTENT GOES HERE!
            </div>
          </>
        }
      </>
    );
  }
}


export default NewTool;
