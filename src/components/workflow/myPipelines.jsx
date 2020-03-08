import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
//import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import InfoDialog from "../common/info";
import "./workflows.css";


function MyPipelines() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // let history = useHistory();
  // const handleClick = param => e => {
  //   e.preventDefault();
  //   history.push(`/${param}`);
  // };

  useEffect(() => {    
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();

    const apiCall = new ApiService("/pipelines", {}, accessToken);
    apiCall.get()
      .then(function (result) {
        console.log(result);
        setData(result.data);
        setLoading(false);        
      })
      .catch(function (error) {
        setLoading(false);
        setErrors(error);
        console.log(`Error Reported: ${error}`);
      });
  }
  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        {loading ? <LoadingDialog size="sm" /> :
          <>
            <div className="mt-3 max-content-width">
              {data.length > 0 ?
                <ItemSummaries data={data} /> :
                <InfoDialog message="No Pipelines Found" />}
            </div>
          </>
        }
      </>
    );
  }
}


const ItemSummaries = (props) => {
  const { data } = props;
  console.log(data);

  return (
    <>
      {data.length > 0 ? data.map((item, idx) => (
        <Card key={idx} className="mb-3">
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{item.project}</Card.Subtitle>
            <Card.Text>
              {item.description}
            </Card.Text>
            <Link to={location => `/workflow/${item._id}`} className="card-link">Details</Link>
            <Link to='/workflow' className="card-link disabled">Edit</Link>
            <Link to='/workflow' className="card-link disabled">Run</Link>
            <Link to='/workflow' className="card-link disabled">Pause</Link>
            <Link to='/workflow' className="card-link disabled">Disable</Link>
          </Card.Body>
        </Card>)) : null}

    </>
    
  );
};

ItemSummaries.propTypes = {
  data: PropTypes.array
};

export default MyPipelines;
