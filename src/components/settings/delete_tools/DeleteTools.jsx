import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "../../common/status_notifications/loading";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "../../../core/data_model/model";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import DeleteToolMetadata from "./delete-tool-metadata";
import PropTypes from "prop-types";
import ApplicationListInput from "./inputs/ApplicationListInput";
import deleteToolsActions from "components/settings/delete_tools/settings-delete-tools-action.js";
import ToolsTable from "./ToolsTable";
function DeleteTools() {
  const toastContext = useContext(DialogToastContext);
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteToolDto, setDeleteToolDto] = useState(undefined);
  // const [isLoading, setIsLoading] = useState(true);

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  
  const loadData = async (cancelSource = cancelTokenSource) => {

    try {
      setIsLoading(true);
      await getRoles(cancelSource);

    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (!userRoleAccess) {
      setIsLoading(false);
      toastContext.showLoadingErrorDialog("Unable to fetch access privileges");
      return;
    }
    setAccessRoleData(userRoleAccess);
    setDeleteToolDto(
      new Model({ ...DeleteToolMetadata.newObjectFields }, DeleteToolMetadata, true)
    );
 };

 const loadApplicationTools = async (cancelSource = cancelTokenSource) => {
  const response = await deleteToolsActions.getAllApplicationsV2(getAccessToken, cancelSource);
  if (isMounted?.current === true && response?.data) { 
    let application = response.data.find(ele => ele._id  === deleteToolDto.getData("applicationId"));
    // console.log(application);
    deleteToolDto.setData("toolsList", application?.tools);
  }
};

 const getToolsTable = () => {
  if(!isLoading && deleteToolDto.getData("applicationId") && deleteToolDto.getData("applicationId").length > 0 &&  deleteToolDto.getData("toolsList") ) {
    return (
          <ToolsTable data={deleteToolDto.getData("toolsList")} loadData={loadApplicationTools} className="p-2 ml-2" />
        );
  }
};

  const getBody = () => {
    if (isLoading) {
      return <LoadingDialog message={"Loading Data"} size={"sm"} />;
    }

    return (
      <div className="px-2 pb-2">
        <Row className="ml-auto mt-3">
          <Col lg={12}>
            <ApplicationListInput
             fieldName={"gitBranch"}
             dataObject={deleteToolDto}
             setDataObject={setDeleteToolDto}
            //  disabled={disabled}
            />
          </Col>
        </Row>
        {getToolsTable()}
      </div>
    );
  };

  if (!accessRoleData) {
    return (
      <ScreenContainer
        breadcrumbDestination={"deleteTools"}
        pageDescription={"This tool enables administrators to select a registered application, view the active tools and then delete them from the platform. This will perform a complete end to end removal of all instances related to an application."}
        isLoading={true}
      />
    );
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"deleteTools"}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator &&  !accessRoleData?.SassPowerUser}
      pageDescription={"This tool enables administrators to select a registered application, view the active tools and then delete them from the platform. This will perform a complete end to end removal of all instances related to an application."}
    >
      {getBody()}
    </ScreenContainer>
  );
}

DeleteTools.propTypes = {
  history: PropTypes.any
};

export default DeleteTools;
