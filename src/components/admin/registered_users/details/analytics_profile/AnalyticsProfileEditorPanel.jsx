import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisteredUserActions from "components/admin/registered_users/registered-user-actions";
import Model from "core/data_model/model";
import toolsActions from "components/inventory/tools/tools-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import ToolIdentifierMultiSelectInput
  from "components/common/list_of_values_input/admin/tools/ToolIdentifierMultiSelectInput";
import axios from "axios";

function AnalyticsProfileEditorPanel({ analyticsProfileData, setAnalyticsProfileData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [analyticsProfileDataDto, setAnalyticsProfileDataDto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
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
  };

  const updateProfile = async () => {
    if(analyticsProfileDataDto.isModelValid()) {
      try {
        const response = await RegisteredUserActions.updateAnalyticsProfile(analyticsProfileDataDto, getAccessToken);
        let newDto = new Model(response?.data, analyticsProfileDataDto.metaData, false);
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

  if (isLoading) {
    return <LoadingDialog size={"sm"} />;
  }

  if (analyticsProfileDataDto == null) {
    return <div className="text-center p-5 text-muted">No analytics profile is available for this user.</div>;
  }

  return (
    <EditorPanelContainer
      recordDto={analyticsProfileData}
      setRecordDto={setAnalyticsProfileData}
      updateRecord={updateProfile}
      createRecord={updateProfile}
    >
      <Row>
        <Col>
          <ToolIdentifierMultiSelectInput
            toolRegistryFilter={false}
            fieldName={"enabledTools"}
            setDataObject={setAnalyticsProfileDataDto}
            dataObject={analyticsProfileDataDto}
          />
        </Col>
        <Col>
          <TextInputBase fieldName="dataUsage" setDataObject={setAnalyticsProfileDataDto} dataObject={analyticsProfileDataDto}/>
        </Col>
        <Col>
          <TextInputBase fieldName="hitsIndex" setDataObject={setAnalyticsProfileDataDto} dataObject={analyticsProfileDataDto}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInputBase fieldName="analyticsServerUrl" setDataObject={setAnalyticsProfileDataDto}
                        dataObject={analyticsProfileDataDto}/>
        </Col>
        <Col>
          <TextInputBase fieldName="defaultPersona" setDataObject={setAnalyticsProfileDataDto} dataObject={analyticsProfileDataDto}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <BooleanToggleInput dataObject={analyticsProfileDataDto} setDataObject={setAnalyticsProfileDataDto} fieldName={"allowData"}/>
        </Col>
        <Col>
          <ActivityToggleInput dataObject={analyticsProfileDataDto} setDataObject={setAnalyticsProfileDataDto} fieldName={"active"}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <BooleanToggleInput dataObject={analyticsProfileDataDto} setDataObject={setAnalyticsProfileDataDto} fieldName={"Infrastructure"}/>
        </Col>
        <Col>
          <BooleanToggleInput dataObject={analyticsProfileDataDto} setDataObject={setAnalyticsProfileDataDto} fieldName={"Pipeline"}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

AnalyticsProfileEditorPanel.propTypes = {
  analyticsProfileData: PropTypes.object,
  setAnalyticsProfileData: PropTypes.func,
};

export default AnalyticsProfileEditorPanel;


