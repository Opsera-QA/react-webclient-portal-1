import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import { Row, Col, Button } from "react-bootstrap";
import { apigeeRunParametersActions } from '../apigeeRunParameters.actions';
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import BackButton from "components/common/buttons/back/BackButton";
import LoadingDialog from "components/common/status_notifications/loading";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ApigeeMigrationObjectKvmEntryInputRow from "./inputs/ApigeeMigrationObjectKvmEntryInputRow";
import InfoContainer from "components/common/containers/InfoContainer";

const ApigeeMigrationObjectKvmEntriesPanel = ({ toolId, cancelHandler, handler, migrationObject, setMigrationObject }) => {

  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [kvmEntries, setKvmEntries] = useState([]);
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
      await getKvmEntries(cancelSource);
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

  const getKvmEntries = async (cancelSource = cancelTokenSource) => {

    const response = await apigeeRunParametersActions.getKvmEntries(getAccessToken, cancelSource, toolId, migrationObject.getPersistData());    

    const message = response?.data?.message;    
    if (Array.isArray(message)) {
      setKvmEntries(message);
    }    
  };

  const setNameFunction = (index, newValue) => {    
    let newKvmList = [...kvmEntries];

    if (newKvmList[index]["name"] !== newValue) {
      newKvmList[index]["name"] = newValue;
      setKvmEntries([...newKvmList]);
    }
  };

  const setValueFunction = (index, newValue) => {
    let newKvmList = [...kvmEntries];

    if (newKvmList[index]["value"] !== newValue) {
      newKvmList[index]["value"] = newValue;
      setKvmEntries([...newKvmList]);
    }
  };

  const getHeaderBar = () => {
    return (
      <Row className="d-flex py-1 mx-0 justify-content-between property-header bold">        
        <Col sm={6}>
          Name
        </Col>
        <Col sm={6}>
          Value
        </Col>
      </Row>      
    );
  };

  const getFieldBody = () => {
    return (
      <>
        {kvmEntries.map((entry, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <ApigeeMigrationObjectKvmEntryInputRow 
                entry={entry}
                setNameFunction={(value) => setNameFunction(index, value)}
                setValueFunction={(value) => setValueFunction(index, value)}
              />              
            </div>            
          );
        })}
      </>      
    );    
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
            <TextFieldBase dataObject={migrationObject} fieldName={"environment"}/>
          </Col>
        </Row>
        <div className="container-border">
          <div className={"filter-bg-white"}>
            {getHeaderBar()}
          </div>
          {getFieldBody()}
        </div>        
        <SaveButtonContainer>
          <BackButton
            variant={"secondary"}
            backButtonFunction={() => cancelHandler()}
            isLoading={isLoading}
            className={"mr-2"}
          />
          <Button size="sm" variant="success" disabled={isLoading || kvmEntries.length === 0} onClick={() => handler(kvmEntries, migrationObject)}>
            <span>Save</span>
          </Button>
        </SaveButtonContainer>
      </div>    
    );
  };

  return (
    <InfoContainer
      titleText={"KVM Entries For Apigee Migration Object"}      
    >
      {getInputFields()}
    </InfoContainer>
  );
};

ApigeeMigrationObjectKvmEntriesPanel.propTypes = {
  toolId: PropTypes.string,  
  cancelHandler: PropTypes.func,
  handler: PropTypes.func,
  migrationObject: PropTypes.object,
  setMigrationObject: PropTypes.func,
};

export default ApigeeMigrationObjectKvmEntriesPanel;
