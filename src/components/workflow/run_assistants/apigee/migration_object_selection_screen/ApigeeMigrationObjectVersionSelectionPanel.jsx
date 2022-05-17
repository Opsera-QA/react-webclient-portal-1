import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { Row, Col, Button } from "react-bootstrap";
import { apigeeRunParametersActions } from '../apigeeRunParameters.actions';
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import BackButton from "components/common/buttons/back/BackButton";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ArrayToTextField from "components/common/fields/text/ArrayToTextField";


const ApigeeMigrationObjectVersionSelectionPanel = ({ toolId, cancelHandler, handler, migrationObject, setMigrationObject }) => {

  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [migrationObjectDependencies, setMigrationObjectDependencies] = useState([]);
  const [migrationObjectVersions, setMigrationObjectVersions] = useState([]);
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
      await getMigrationObjectDependencies(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        const prependMessage = "Service Error Triggering Migration Object List pull from Apigee:";
        toastContext.showInlineErrorMessage(error, prependMessage);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getMigrationObjectDependencies = async (cancelSource = cancelTokenSource) => {

    const response = await apigeeRunParametersActions.getMigrationObjectDependencies(getAccessToken, cancelSource, toolId, migrationObject.getPersistData());

    const message = response?.data?.message;

    if (response?.data?.status !== 200) {      
      toastContext.showInlineErrorMessage("Service Error getting Migration Object dependencies List pull from Apigee: " + message);
    }    
    
    setMigrationObjectVersions(message.versions);
    setMigrationObjectDependencies(message.dependencies);

    const dataObj = {...migrationObject};
    dataObj.setData("dependencies", message.dependencies);
    setMigrationObject({...dataObj});
  };

  const getInputFields = () => {

    if (isLoading || migrationObject == null) {
      return <LoadingDialog size="sm" message={"Loading Data"} />;
    }

    return (
      <div className='px-4 py-2'>
        <Row>
          <Col lg={4}>
            <TextFieldBase dataObject={migrationObject} fieldName={"name"}/>
          </Col>
          <Col lg={4}>
            <TextFieldBase dataObject={migrationObject} fieldName={"type"}/>
          </Col>
          <Col lg={4}>
            <ArrayToTextField
              model={migrationObject}
              fieldName={"dependencies"}
            />
          </Col>
          <Col lg={12}>
            <SelectInputBase
              fieldName={"version"}
              dataObject={migrationObject}
              setDataObject={setMigrationObject}
              selectOptions={migrationObjectVersions}        
              textField={"version"}
              valueField={"version"}
              busy={isLoading}
              placeholderText={"Select Version"}
              disabled={isLoading || (!isLoading && (migrationObjectVersions == null || migrationObjectVersions.length === 0))}
            />
          </Col>
        </Row>        
        <SaveButtonContainer>
          <BackButton
            variant={"secondary"}
            backButtonFunction={() => cancelHandler()}
            isLoading={isLoading}
            className={"mr-2"}
          />
          <Button size="sm" variant="success" disabled={isLoading} onClick={() => handler(migrationObject.getPersistData())}>
            <span>Save</span>
          </Button>
        </SaveButtonContainer>
      </div>    
    );
  };

  return (
    <div className="object-properties-input">
      <div className="content-container">
        <div className="property-header">
          <h6 className="pl-2 pt-2">            
            Select Version For Apigee Migration Object
          </h6>
        </div>
        <div className="properties-body-alt">
          {getInputFields()}
        </div>
      </div>
    </div>
    
  );
};

ApigeeMigrationObjectVersionSelectionPanel.propTypes = {
  toolId: PropTypes.string,  
  cancelHandler: PropTypes.func,
  handler: PropTypes.func,
  migrationObject: PropTypes.object,
  setMigrationObject: PropTypes.func,
};

export default ApigeeMigrationObjectVersionSelectionPanel;
