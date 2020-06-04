import React, { useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";  
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import LoadingDialog from "components/common/loading";
import { useHistory, useParams } from "react-router-dom";

import ToolsTable from "./toolsTable";
import NewTool from "./newTool";

function ToolInventory () {

  const { getAccessToken } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [rowDetails, editRowDetails] = useState({
    id: "",
    details: {}
  });
  const [modalType, setModalType] = useState("new");
  const [toolList, setToolList] = useState([]);
  let history = useHistory();
  const { id, view } = useParams();

  const editTool = (cellData) => {
    history.push(`/inventory/tools/${cellData.row.original._id}`);
    setModalType("edit");
    editRowDetails({
      id: cellData.row.original._id,
      details: cellData.row.values
    });
    setShowModal(true);
  };

  const deleteTool = async (cellData) => {
    editRowDetails({
      id: cellData.row.original._id,
      details: cellData.row.values
    });

    const accessToken = await getAccessToken();
    const response = await axiosApiService(accessToken).delete("/registry/" + cellData.row.original._id )
      .then((result) =>  {
        getToolRegistryList("");
      })
      .catch(error => {return error;});
  };

  const getToolRegistryList = async (id) => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      let apiUrl = id ? "/registry/" + id : "/registry/";
      const response = await axiosApiService(accessToken).get(apiUrl, {});
      if(id) {
        editRowDetails({
          id: id,
          details: response.data[0]
        });
        setShowModal(true);
      }else {
        setToolList(response.data);
      }
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
    }
  };
    
  useEffect(() => {    
    if(id && id.match(/^[0-9a-fA-F]{24}$/))  setModalType("edit");
    getToolRegistryList(id !=  undefined ? id : "");   
  }, []);

  const handleActionClick = () => {
    setModalType("new");
    editRowDetails({
      id: "",
      details: ""
    });
    setShowModal(true);
  };

  const closeModal = (data) => {
    setShowModal(false);
    getToolRegistryList(null);
    history.push("/inventory/tools");
  };

  const actionButtons = (cellData) => {
    return(
      <>
        <Button variant="outline-primary" size="sm" className="mr-2" onClick={() => { editTool(cellData); }} ><FontAwesomeIcon icon={faEdit} className="mr-1"/> Edit</Button>
        <Button variant="outline-danger" size="sm" className="mr-1" onClick={() => { deleteTool(cellData); }} ><FontAwesomeIcon icon={faTrash} className="mr-1"/> Delete</Button>
      </>
    );
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
        Cell: (cellData) => actionButtons(cellData)
      }
    ],
    []
  );

  const NoDataConst = () => (
    <p>This is the dynamic title</p>
  );

  return (
    <>
      
      <NewTool showModal={showModal} closeModal={(toggleModal) => closeModal(toggleModal)} type={modalType} edittool={rowDetails}/>

      <div className="mt-2 mb-2 text-right">
        <Button variant="primary" size="sm"  
          onClick={() => { handleActionClick("new"); }}> 
          <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Entry
        </Button>
        <br />
      </div>
      {isLoading && <LoadingDialog />}
      {!isLoading && <ToolsTable columns={columns} data={toolList} />}
      
    </>
  );  
}


export default ToolInventory;