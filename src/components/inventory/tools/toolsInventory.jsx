import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Alert, Table, Button } from "react-bootstrap";
import { format } from "date-fns";
import { AuthContext } from "contexts/AuthContext";  
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import LoadingDialog from "components/common/loading";

import ToolsTable from "./toolsTable";
import NewTool from "./newTool";

function ToolInventory () {

  const { getAccessToken } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [rowDetails, editRowDetails] = useState({});
  const [modalType, setModalType] = useState("new");
  const [toolList, setToolList] = useState([]);


  const editTool = (cellData) => {
    setModalType("edit");
    editRowDetails(cellData.row.values);
    setShowModal(true);
  };

  const getToolRegistryList = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axiosApiService(accessToken).get("/registry", {});
      setToolList(response.data);
      console.log(response.data);
    }
    catch (err) {
      console.log(err.message);
    }
  };
    
  useEffect(() => {    
    getToolRegistryList();
  }, []);

  const handleActionClick = () => {
    setShowModal(true);
  };

  const closeModal = (data) => {
    setShowModal(data);
    getToolRegistryList();
  };

  
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Tool Identifier",
        accessor: "tool_identifier"
      },
      {
        Header: "Contacts",
        //accessor: "contacts"
      },
      {
        Header: "Project",
        //accessor: "project"
      },
      {
        Header: "Application",
        //accessor: "application"
      },
      {
        Header: "Created Date",
        accessor: "createdAt"
      },
      {
        Header: "Action",
        Cell: (cellData) => <Button variant="link" onClick={() => { editTool(cellData); }} ><FontAwesomeIcon icon={faEdit} className="mr-1"/> Edit</Button>
      }
    ],
    []
  );

  return (
    <>
      <NewTool showModal={showModal} closeModal={(toggleModal) => closeModal(toggleModal)} type={modalType} edittool={rowDetails}/>

      <div className="mt-2 mb-2 text-right">
        <Button variant="primary" size="sm"  
          onClick={() => { handleActionClick("add"); }}> 
          <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Entry
        </Button>
        <br />
      </div>
      {Object.keys(toolList).length == 0 && <LoadingDialog />}
      {Object.keys(toolList).length > 0 && <ToolsTable columns={columns} data={toolList} />}
    </>
  );  
}


export default ToolInventory;