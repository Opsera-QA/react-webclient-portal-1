import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import awsActions from "../../aws-actions";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import AwsCloudProviderRegionSelectInput
  from "components/common/list_of_values_input/aws/AwsCloudProviderRegionSelectInput";
import AwsS3BucketVersionSelectInput from "./inputs/AwsS3BucketVersionSelectInput";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import modelHelpers from "components/common/model/modelHelpers";
import awsS3BucketMetadata from "../aws-s3-bucket-metadata";

function AwsS3BucketEditorPanel({ awsS3BucketsData, toolData, handleClose, editMode, editRowData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [awsS3BucketModel, setAwsS3BucketModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
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
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [awsS3BucketsData]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      if(editMode){
        const response = await awsActions.getS3BucketDetails(toolData.getData("_id"), editRowData.regions, editRowData.bucketName, getAccessToken, cancelSource);
        
        if(response && response?.status === 200) {
          setAwsS3BucketModel(modelHelpers.parseObjectIntoModel(response?.data?.message ? response.data.message : {}, awsS3BucketMetadata));
        }
      }else{
        setAwsS3BucketModel(awsS3BucketsData);
      }      
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createS3Bucket = async () => {
    let newConfiguration = awsS3BucketModel.getPersistData();
    const response = await awsActions.createS3Bucket(getAccessToken, cancelTokenSource, toolData?._id, newConfiguration);
    handleClose();
    return response;
  };

  const deleteS3Bucket = async () => {
    const response = await awsActions.deleteS3Bucket(getAccessToken, cancelTokenSource, toolData?._id, awsS3BucketModel.getPersistData());
    handleClose();
    return response;
  };

  const getExtraButtons = () => {
    if (editMode) {
      return (
        <DeleteButtonWithInlineConfirmation dataObject={awsS3BucketModel} deleteRecord={deleteS3Bucket}/>
      );
    }
  };

  if (isLoading || awsS3BucketModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={awsS3BucketModel}
      createRecord={createS3Bucket}
      updateRecord={createS3Bucket}
      setRecordDto={setAwsS3BucketModel}
      isLoading={isLoading}
      extraButtons={getExtraButtons()}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase
            dataObject={awsS3BucketModel}
            setDataObject={setAwsS3BucketModel}            
            fieldName={"bucketName"}
            disabled={editMode}
          />
        </Col>
        <Col lg={12}>
          <AwsS3BucketVersionSelectInput 
            model={awsS3BucketModel}
            setModel={setAwsS3BucketModel}            
            fieldName={"bucketVersion"}
          />
        </Col>
        <Col lg={12}>
          <AwsCloudProviderRegionSelectInput 
            model={awsS3BucketModel} 
            setModel={setAwsS3BucketModel} 
            fieldName={"regions"} 
            disabled={editMode}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput 
            dataObject={awsS3BucketModel} 
            setDataObject={setAwsS3BucketModel} 
            fieldName={"blockPublicAcls"} 
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput 
            dataObject={awsS3BucketModel} 
            setDataObject={setAwsS3BucketModel} 
            fieldName={"blockPublicPolicy"} 
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput 
            dataObject={awsS3BucketModel} 
            setDataObject={setAwsS3BucketModel} 
            fieldName={"ignorePublicAcls"} 
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput 
            dataObject={awsS3BucketModel} 
            setDataObject={setAwsS3BucketModel} 
            fieldName={"restrictPublicBuckets"} 
          />
        </Col>
      </Row>      
    </EditorPanelContainer>
  );
}

AwsS3BucketEditorPanel.propTypes = {
  awsS3BucketsData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  handleClose: PropTypes.func,
  editMode: PropTypes.bool,
  editRowData: PropTypes.object,
};

export default AwsS3BucketEditorPanel;
