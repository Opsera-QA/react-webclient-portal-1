import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import JiraTicketsAssignedByUserBarChart from "../../analytics/charts/jiraTicketsAssignedByUserBarChart";

function PlanningDashboard( { persona } ){
  const contextType = useContext(AuthContext);
  const [token, setToken] = useState();
  
  const getApiData = async () => {
    const { getAccessToken } = contextType;

    const accessToken = await getAccessToken();
    setToken(accessToken);
    
  };

  useEffect( () => {
    getApiData();
  }, []);
  
  return (
    <>
      <div className="p-2 flex-grow-1">
        <div className="chart mb-3" style={{ height: "300px" }}>
          <JiraTicketsAssignedByUserBarChart token={token} persona={persona} />
        </div> 
      </div>
      
    </>
  );
}
export default PlanningDashboard;


// import React, { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
// import { AuthContext } from "../../../contexts/AuthContext";
// import { ApiService } from "../../../api/apiService";
// import LoadingDialog from "../../common/loading";
// import ErrorDialog from "../../common/error";
// import InfoDialog from "../../common/info";
// import { Table }  from "react-bootstrap";
// import JiraTicketsAssignedByUserBarChart from "../../analytics/charts/jiraTicketsAssignedByUserBarChart";

// function PlanningDashboard( { persona } ){
//   const contextType = useContext(AuthContext);
//   const [error, setErrors] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [previewRole, setPreviewRole] = useState(false);
  
//   const getApiData = async () => {
//     setLoading(true);
//     const { getAccessToken, getIsPreviewRole } = contextType;

//     //this returns true IF the Okta groups for user contains "Preview".  Please wrap display compontents in this.
//     const isPreviewRole = await getIsPreviewRole(); 
//     console.log("Is User Granted Preview Role? ", isPreviewRole);

//     const accessToken = await getAccessToken();
//     const apiCall = new ApiService("/analytics/dashboard/planning", {}, accessToken);
    
//     apiCall.get()
//       .then(res => {
//         let dataObject = res && res.data ? res.data.data[0] : [];
//         setData(dataObject);
//         setLoading(false);
//         setPreviewRole(isPreviewRole);
//       })
//       .catch(err => {
//         setErrors(err);
//         setLoading(false);
//       });
//   };

//   useEffect( () => {
//     getApiData();
//   }, []);
//   if(loading) {
//     return (<LoadingDialog size="lg" />);
//   } else if (error) {
//     return (<ErrorDialog  error={error} />);
//   } else if (data === undefined || Object.keys(data).length == 0 || Object.values(data).every(element => Object.keys(element.data[0]).length === 0)
//   || Object.values(data).every(element => element.status !== 200)) {
//     return (<InfoDialog  message="No log activity has been captured for this dashboard yet." />);
//   } else {
//     return (
//       <>
//         <div className="p-2 flex-grow-1">
//           {Object.keys(data.jiraTicketsAssignedByUser.data[0]).length > 0 && data.jiraTicketsAssignedByUser.status === 200 ? <div className="chart mb-3" style={{ height: "300px" }}>
//             <JiraTicketsAssignedByUserBarChart data={data} persona={persona} />
//           </div> : ""}
//         </div>
//         {Object.keys(data.jiraIssuesByPriority.data[0]).length > 0 && data.jiraIssuesByPriority.status === 200 ? <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
//           <thead>
//             <tr>
//               <th style={{ width: "5%" }}>Issue Type</th>
//               <th style={{ width: "5%" }}>Highest</th>
//               <th style={{ width: "5%" }}>High</th>
//               <th style={{ width: "5%" }}>Medium</th>
//               <th style={{ width: "5%" }}>Low</th>
//               <th style={{ width: "5%" }}>Lowest</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.jiraIssuesByPriority.data.map(function (value, index) {
//               return <tr key = {index}>
//                 <td>{value["issue"]}</td>
//                 <td>{value["Highest"]}</td>
//                 <td>{value["High"]}</td>
//                 <td>{value["Medium"]}</td>
//                 <td>{value["Low"]}</td>
//                 <td>{value["Lowest"]}</td>
//               </tr>;
//             })
//             }
//           </tbody>
//         </Table> : "" }
//       </>
//     );
//   }
// }
// export default PlanningDashboard;