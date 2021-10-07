import React, {useState, useEffect, useContext} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import {platformList} from "./jenkins-create-account-metadata";
import DropdownList from "react-widgets/lib/DropdownList";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import LoadingDialog from "../../../../../../common/status_notifications/loading";
import {DialogToastContext} from "../../../../../../../contexts/DialogToastContext";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function JenkinsAccountEditorPanelOLD({ toolData, jenkinsAccountData }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [ platformType, setPlatformType ] = useState("");
  const [jenkinsAccountDataDto, setJenkinsAccountDataDto] = useState(undefined);
  const [ accountList, setAccountList ] = useState([]);
  const [ account, setAccount ] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  console.log(jenkinsAccountData);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setJenkinsAccountDataDto(jenkinsAccountData);
    setIsLoading(false);
  };

  const updatePlatform = (platform) => {
    setPlatformType(platform["value"]);
    getPlatformData(platform["value"]);
  };

  const updateAccount = (data) => {
    setAccount(data);
  };

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
      toastContext.showLoadingErrorDialog(error);
      console.error(error.message);
    }
  };

  const createJenkinsAccount = async () => {
      let payload = {
        service: platformType,
        credentailsToolId: account._id,
        accountUserName: account.configuration.accountUsername,
        ...jenkinsAccountDataDto.getPersistData()
      };
        const url = "/registry/action/" + toolData["_id"] + "/createcredential";
        const accessToken = await getAccessToken();
        return await axiosApiService(accessToken).post(url, {...payload});
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  } else {
    return (
      <>
      <div className="scroll-y full-height">
        <Row>
          <Col lg={12}>
            <div className="m-2">
              <label><span>Platform <span className="danger-red">*</span></span></label>
              <DropdownList
                data={platformList}
                value={platformType || jenkinsAccountData && jenkinsAccountData.getData("service")}
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
                value={account || jenkinsAccountData && jenkinsAccountData.getData("toolId")}
                disabled={accountList == null || accountList.length === 0}
                textField='name'
                filter='contains'
                placeholder={'Select an Account'}
                onChange={updateAccount}
              />
            </div>
          </Col>
          <Col lg={12}>
            <TextInputBase fieldName={"credentialsId"} dataObject={jenkinsAccountDataDto} setDataObject={setJenkinsAccountDataDto} />
          </Col>
          <Col lg={12}>
            <TextInputBase fieldName={"credentialsDescription"} dataObject={jenkinsAccountDataDto} setDataObject={setJenkinsAccountDataDto} />
          </Col>
          <Col lg={12}>
            <div className="m-2">
              <div className="custom-text-field"><label className="mr-2">Account:</label><span>{account && account.configuration.accountUsername}</span></div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="ml-auto mt-3 px-3">
            <SaveButtonBase recordDto={jenkinsAccountDataDto} createRecord={createJenkinsAccount} updateRecord={createJenkinsAccount} />
          </div>
        </Row>
      </div>
    </>
  );
  }
}

JenkinsAccountEditorPanelOLD.propTypes = {
  toolData: PropTypes.object,
  jenkinsAccountData: PropTypes.object,
};


export default JenkinsAccountEditorPanelOLD;
