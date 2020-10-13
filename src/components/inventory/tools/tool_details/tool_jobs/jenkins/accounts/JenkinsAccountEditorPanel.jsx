import React, {useState, useEffect, useContext} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import "components/inventory/tools/tools.css";

import {platformList} from "./jenkins-create-account-metadata";
import DropdownList from "react-widgets/lib/DropdownList";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import DtoTextInput from "../../../../../../common/input/dto_input/dto-text-input";
import LoadingDialog from "../../../../../../common/status_notifications/loading";
import SaveButton from "../../../../../../common/buttons/SaveButton";
import {
  getCreateFailureResultDialog,
  getCreateSuccessResultDialog,
  getFormValidationErrorDialog, getLoadingErrorDialog,
} from "../../../../../../common/toasts/toasts";

function JenkinsAccountEditorPanel({ toolData, jenkinsAccountData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [ platformType, setPlatformType ] = useState("");
  const [jenkinsAccountDataDto, setJenkinsAccountDataDto] = useState(undefined);
  const [ accountList, setAccountList ] = useState([]);
  const [ account, setAccount ] = useState(undefined);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setJenkinsAccountDataDto(jenkinsAccountData);
    setIsLoading(false);
  };

  const updatePlatform = (platform) => {
    setPlatformType(platform["value"])
    getPlatformData(platform["value"]);
  }

  const updateAccount = (data) => {
    setAccount(data);
  }

  const getPlatformData = async (data) => {
    try {
      const url = "/registry/properties/" + data;
      const accessToken = await getAccessToken();
      const platformResponse = await axiosApiService(accessToken).get(url, {});
      let accountList = [];

      platformResponse.data.map(account => {
        if (account.configuration != null && account.configuration.accountUsername != null) {
          accountList.push(account);
        }
      });

      let newAccount = accountList.length > 0 ? accountList[0] : undefined;

      if (newAccount != null)
      {
        setAccount(newAccount);
      }

      setAccountList(accountList);
    }
    catch (error) {
      let toast = getLoadingErrorDialog(error.message, setShowToast);
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  const createJenkinsAccount = async () => {
    if(jenkinsAccountDataDto.isModelValid()) {
      let payload = {
        service: platformType,
        credentailsToolId: account._id,
        accountUserName: account.configuration.accountUsername,
        ...jenkinsAccountDataDto.getPersistData()
      };
      try {
        const url = "/registry/action/" + toolData["_id"] + "/createcredential";
        const accessToken = await getAccessToken();
        await axiosApiService(accessToken).post(url, {...payload});

        let toast = getCreateSuccessResultDialog("Jenkins Account Credential", setShowToast, "top");
        setToast(toast);
        setShowToast(true);
      } catch (error) {
        let toast = getCreateFailureResultDialog("Jenkins Account Credential", error.message, setShowToast, "top");
        setToast(toast);
        setShowToast(true);
        console.error(error.message);
      }
    }
    else {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
        {showToast && toast}
      <div className="scroll-y full-height">
        <Row>
          <Col lg={12}>
            <div className="m-2">
              <label><span>Platform <span className="danger-red">*</span></span></label>
              <DropdownList
                data={platformList}
                value={platformType}
                textField='label'
                filter='contains'
                placeholder={'Select a Platform'}
                onChange={updatePlatform}
              />
            </div>
          </Col>
          <Col lg={12}>
            <div className="m-2">
              <label><span>Platform <span className="danger-red">*</span></span></label>
              <DropdownList
                data={accountList}
                value={account}
                disabled={accountList == null || accountList.length === 0}
                textField='name'
                filter='contains'
                placeholder={'Select an Account'}
                onChange={updateAccount}
              />
            </div>
          </Col>
          <Col lg={12}>
            <DtoTextInput fieldName={"credentialsId"} dataObject={jenkinsAccountDataDto} setDataObject={setJenkinsAccountDataDto} />
          </Col>
          <Col lg={12}>
            <DtoTextInput fieldName={"credentialsDescription"} dataObject={jenkinsAccountDataDto} setDataObject={setJenkinsAccountDataDto} />
          </Col>
          <Col lg={12}>
            <div className="m-2">
              <div className="custom-text-field"><label className="mr-2">Account:</label><span>{account && account.configuration.accountUsername}</span></div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="ml-auto mt-3 px-3">
            <SaveButton recordDto={jenkinsAccountDataDto} altButtonText={"Add Jenkins Credentials"} type={"Jenkins Account Credentials"} createRecord={createJenkinsAccount} />
          </div>
        </Row>
      </div>
    </>
  );
  }
}

JenkinsAccountEditorPanel.propTypes = {
  toolData: PropTypes.object,
  jenkinsAccountData: PropTypes.object,
};


export default JenkinsAccountEditorPanel;
