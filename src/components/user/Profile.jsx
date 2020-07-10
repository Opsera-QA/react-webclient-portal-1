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
  const [user, setUser] = useState();
    
  useEffect(() => {
    fetchData();
  }, []); 

  async function fetchData() {
    setLoading(true);
    const { getUserRecord, getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const userInfoResponse = await getUserRecord();
    setToken(accessToken);
    
    const apiCall = new ApiService("/analytics/settings", {}, accessToken);
    apiCall.get()
      .then(function (result) {
        setData(result.data.profile[0]);
        setLoading(false);  
        setUser(userInfoResponse);      
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
        <div className="max-content-width mt-3 mb-4">
          <h4>My User Profile</h4>
          <p>Review and manage your user profile information as well as platform settings from this page.  Please note, profile details are 
              stored in your identify provider so some changes may not be possible from this portal at this time.</p>               
        </div>

        <h6 className="mt-4">My Profile</h6>
        <div className="p-2 mt-1">
          {user && 
         <>        
           <Table>
             <tbody>
               <tr><td>OpsERA User ID</td><td>{user._id}</td></tr>
               <tr><td>Name</td><td>{user.firstName} {user.lastName}</td></tr>
               <tr><td>Email Address</td><td>{user.email}</td></tr>
               <tr><td>Job Title</td><td>{user.title}</td></tr>
               <tr><td>Organization</td><td>{user.organizationName}</td></tr> {/* TODO: Replace with LDAP Org */}
               <tr><td>Account</td><td>{user.account}</td></tr>
               <tr><td>Platform SubDomain</td><td>{user.domain}</td></tr>
               <tr><td>Created</td><td>{user.createdAt}</td></tr>
               <tr><td>Groups & Roles</td>
                 <td>
                   {user.groups !== undefined && user.groups.map((group) => {
                     return <div key={group}>{group}</div>;
                   })}
                 </td></tr>
             </tbody>
           </Table>
         </>}
        </div>


        {/* 
        <h6>Analytics and Logging Settings</h6>  
        <div className="p-2 mt-1">
          {error && <ErrorDialog error={error} />}
          <ConfigurationsForm settings={data} token={token} />
        </div>
 */}

      </>
        
      }
    </div>
  );
}

export default Profile;
