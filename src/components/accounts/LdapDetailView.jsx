import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { axiosApiService } from "api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import { Link } from "react-router-dom";
import { format } from "date-fns"; 


import "./accounts.css";

function LdapDetailView() {
  
  
  return (
    
    <>
      <div>CONTENT HERE</div>

    </>);
}

export default LdapDetailView; 