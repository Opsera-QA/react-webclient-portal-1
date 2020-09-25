import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RegisteredUserActions from "../../registered-user-actions";
import LoadingDialog from "../../../../common/status_notifications/loading";
import DtoTextInput from "../../../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../../../common/input/dto_input/dto-toggle-input";
import DtoMultiselectInput from "../../../../common/input/dto_input/dto-multiselect-input";
import SaveButton from "../../../../common/buttons/SaveButton";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import Model from "../../../../../core/data_model/model";

function AnalyticsProfileEditorPanel({ analyticsProfileData, setAnalyticsProfileData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [analyticsProfileDataDto, setAnalyticsProfileDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [toolList, setToolList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await getToolList();
    await unpackData(analyticsProfileData);
    setIsLoading(false);
  };

  const unpackData = (analyticsProfileData) => {
    if (analyticsProfileData != null) {
      let unpackedData = {...analyticsProfileData};
      unpackedData.setData("Infrastructure", analyticsProfileData.getData("workflowType")["Infrastructure"]);
      unpackedData.setData("Pipeline", analyticsProfileData.getData("workflowType")["Pipeline"]);
      setAnalyticsProfileDataDto(unpackedData);
    }
  }

  const updateProfile = async () => {
    if(analyticsProfileDataDto.isModelValid2()) {
      try {
        const response = await RegisteredUserActions.updateAnalyticsProfile(analyticsProfileDataDto, getAccessToken);
        let newDto = new Model(response.data, analyticsProfileDataDto.metaData, false);
        toastContext.showUpdateSuccessResultDialog(analyticsProfileDataDto.getType());
        setAnalyticsProfileData(newDto);
        unpackData(newDto);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    else {
      toastContext.showFormValidationErrorDialog();
    }
  };


  const getToolList = async () => {
    const response = await RegisteredUserActions.getTools(getAccessToken);
    setToolList(response.data)
  }

  if (isLoading) {
    return <LoadingDialog size={"sm"} />
  }

  if (analyticsProfileDataDto == null) {
    return <div className="text-center p-5 text-muted">No analytics profile is available for this user.</div>;
  }

  return (
    <>
      <Row>
        <Col>
          <DtoMultiselectInput
            selectOptions={toolList}
            fieldName={"enabledTools"}
            setDataObject={setAnalyticsProfileDataDto}
            dataObject={analyticsProfileDataDto}
            valueField={"identifier"}
            textField={"name"}
          />
        </Col>
        <Col>
          <DtoTextInput fieldName="dataUsage" setDataObject={setAnalyticsProfileDataDto} dataObject={analyticsProfileDataDto}/>
        </Col>
        <Col>
          <DtoTextInput fieldName="hitsIndex" setDataObject={setAnalyticsProfileDataDto} dataObject={analyticsProfileDataDto}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <DtoTextInput fieldName="analyticsServerUrl" setDataObject={setAnalyticsProfileDataDto}
                        dataObject={analyticsProfileDataDto}/>
        </Col>
        <Col>
          <DtoTextInput fieldName="defaultPersona" setDataObject={setAnalyticsProfileDataDto} dataObject={analyticsProfileDataDto}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <DtoToggleInput dataObject={analyticsProfileDataDto} setDataObject={setAnalyticsProfileDataDto} fieldName={"allowData"}/>
        </Col>
        <Col>
          <DtoToggleInput dataObject={analyticsProfileDataDto} setDataObject={setAnalyticsProfileDataDto} fieldName={"active"}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <DtoToggleInput dataObject={analyticsProfileDataDto} setDataObject={setAnalyticsProfileDataDto}
                          fieldName={"Infrastructure"}/>
        </Col>
        <Col>
          <DtoToggleInput dataObject={analyticsProfileDataDto} setDataObject={setAnalyticsProfileDataDto} fieldName={"Pipeline"}/>
        </Col>
      </Row>
      <Row>
        <div className="ml-auto px-3">
          <SaveButton updateRecord={updateProfile} createRecord={updateProfile} recordDto={analyticsProfileData}/>
        </div>
      </Row>
    </>
  );
}

AnalyticsProfileEditorPanel.propTypes = {
  analyticsProfileData: PropTypes.object,
  setAnalyticsProfileData: PropTypes.func,
};

export default AnalyticsProfileEditorPanel;


