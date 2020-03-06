import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
import { Table, Card } from "react-bootstrap";
import ConfigurationsForm from "../analytics/configurationsForm";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";

function Profile() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [claims, setClaims] = useState();
    
  useEffect(() => {
    fetchData();
  }, []); 

  async function fetchData() {
    setLoading(true);
    const { getUserInfo, getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const userInfoResponse = await getUserInfo();
    setToken(accessToken);
    
    const apiCall = new ApiService("/analytics/settings", {}, accessToken);
    apiCall.get()
      .then(function (result) {
        setData(result.data.profile[0]);
        setLoading(false);  
        applyClaims(userInfoResponse);      
      })
      .catch(function (error) {
        setLoading(false);
        setErrors(error);
        console.log(`Error Reported: ${error}`);
      });
  }

  async function applyClaims(user) {
    if (user && !claims) {
      const claims = Object.entries(user);
      setClaims(claims);
    }
  }

  return (
    <div className="mt-3 max-content-width">
      {loading && <LoadingDialog />}
      {!loading && 
      <>
        <div className="max-content-width mt-3 mb-4">
          <h4>My User Profile</h4>
          <p>Review and manage your user profile information as well as platform settings from this page.  Please note, profile details are 
              stored in your identify provider so some changes may not be possible from this portal at this time.</p>               
        </div>

        <h6>Analytics and Logging Settings</h6>  
        <div className="p-2 mt-1">
          {error && <ErrorDialog error={error} />}
          <ConfigurationsForm settings={data} token={token} />
        </div>

        <h6 className="mt-4">My User Profile (powered by Okta)</h6>
        <div className="p-2 mt-1">
          <Card>
            <Card.Body>            
              <Table>
                <tbody>
                  {claims !== undefined && claims.map((claimEntry) => {
                    const claimName = claimEntry[0];
                    const claimValue = claimEntry[1];
                    const claimId = `claim-${claimName}`;
                    return <tr key={claimName}><td>{claimName}</td><td id={claimId}>{claimValue}</td></tr>;
                  })}
                </tbody>
              </Table>
            </Card.Body>        
          </Card>
        </div>
      </>
        
      }
    </div>
  );
}

export default Profile;
