import React, { useEffect, useContext, useState } from "react";
import { Row, Col, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "../../../contexts/DialogToastContext";
import analyticsProfileActions from "./analytics-profile-settings-actions";
import DtoTextInput from "../../common/input/dto_input/dto-text-input";
import DtoToggleInput from "../../common/input/dto_input/dto-toggle-input";
import DtoSelectInput from "../../common/input/dto_input/dto-select-input";
import DtoMultiselectInput from "../../common/input/dto_input/dto-multiselect-input";
import Model from "../../../core/data_model/model";
import AnalyticsProfileMetadata from "./analytics-profile-metadata";
import ScreenContainer from "../../common/panels/general/ScreenContainer";
import LoadingView from "../../common/status_notifications/loading";
import SaveButton2 from "components/common/buttons/saving/SaveButton2";

const DEFAULT_PERSONAS = [
  {
    name: "Developer",
    value: "developer",
  },
  {
    name: "Manager",
    value: "manager",
  },
  {
    name: "Executive",
    value: "executive",
  },
];

function AnalyticsProfileSettings() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsProfileData, setAnalyticsProfileData] = useState(undefined);
  console.log(process.env.REACT_APP_STACK);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await getRoles();
    try {
      setIsLoading(true);
      let fetchedSettings = await fetchProfile();
      console.log(fetchedSettings);
      if (fetchedSettings) {
        setAnalyticsProfileData(new Model(fetchedSettings, AnalyticsProfileMetadata, false));
      } else
        setAnalyticsProfileData(
          new Model({ ...AnalyticsProfileMetadata.newModelBase }, AnalyticsProfileMetadata, true)
        );
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const createProfile = async () => {
    try {
      let res = await analyticsProfileActions.createProfile(getAccessToken);
      //this needs to trigger a full reload of app for now because so many queries check on the status of this record.
      if (res.status === 200) {
        window.location.reload();
        return;
      }
      let errorMessage =
        "ERROR: There has been an error in creating your analytics profile - if this issue persists contact support@opsera.io";
      toastContext.showErrorDialog(errorMessage);
      return;
    } catch (error) {
      console.log(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const updateProfile = async () => {
    try {
      return await analyticsProfileActions.updateProfile(getAccessToken, analyticsProfileData.getPersistData());
    } catch (error) {
      console.log(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const fetchProfile = async () => {
    try {
      let response = await analyticsProfileActions.fetchProfile(getAccessToken);
      if (response && response.data) {
        return response.data;
      }
      return false;
    } catch (error) {
      console.log(error);
      toastContext.showServiceUnavailableDialog();
      return false
    }
  };

  const renderOwnerEmail = function () {
    return (
      <strong>
        <a href={"mailto:" + analyticsProfileData.getData("ldapOwnerEmail")}>
          {analyticsProfileData.getData("ldapOwnerEmail")}
        </a>
      </strong>
    );
  };

  if (!analyticsProfileData || isLoading) {
    return (
      <ScreenContainer
        breadcrumbDestination={"analyticsProfile"}
        pageDescription={"Opsera Analytics Engine Settings."}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <LoadingView size="sm" />
      </ScreenContainer>
    );
  }

  if ((analyticsProfileData && !analyticsProfileData.getData("enabledToolsOn")) || (analyticsProfileData && !analyticsProfileData.getData("active"))) {
    if (
      (analyticsProfileData.getData("ldapAccount") && analyticsProfileData.getData("ldapOwner")) ||
      process.env.REACT_APP_STACK === "free-trial" ||
      !analyticsProfileData.getData("ldapAccount")
    ) {
      return (
        <ScreenContainer
          breadcrumbDestination={"analyticsProfile"}
          pageDescription={"Opsera Analytics Engine Settings."}
        >
          <Card>
            <Card.Header as="h5">Activate Opsera Analytics</Card.Header>
            <div className={"p-4"}>
              <Card.Text>
                Welcome to the OpsERA Analytics Portal! Here you can enable analytics for our supported tools and
                dashboards and metrics around your system's activities. Simply click the Activate Analytics button below
                and then begin configuring your dashboards!
              </Card.Text>
              <div className="mt-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    createProfile();
                  }}
                >
                  Activate Analytics
                </Button>
              </div>
            </div>
          </Card>
        </ScreenContainer>
      );
    }
    if (analyticsProfileData.getData("ldapAccount") && !analyticsProfileData.getData("ldapOwner")) {
      return (
        <ScreenContainer
          breadcrumbDestination={"analyticsProfile"}
          pageDescription={"Opsera Analytics Engine Settings."}
        >
          <Card>
            <Card.Header as="h5">Activate Opsera Analytics</Card.Header>
            <Card.Body>
              <Card.Text>
                Welcome to the OpsERA Analytics Portal! Please contact your account administrator in order to activate
                your analytics account.{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        </ScreenContainer>
      );
    }
  }

  return (
    <ScreenContainer breadcrumbDestination={"analyticsProfile"} pageDescription={"Opsera Analytics Engine Settings."}>
      {analyticsProfileData.getData("ldapAccount") && !analyticsProfileData.getData("ldapOwner") && (
        <Card>
          <Card.Body>
            <Card.Subtitle className="text-muted">
              The Analytics settings are currently in a view only state, in order to update any of the settings please
              contact your account administrator.
            </Card.Subtitle>
          </Card.Body>
        </Card>
      )}
      {process.env.REACT_APP_STACK.toString() === "free-trial" && (
        <Card>
          <Card.Body>
            <Card.Subtitle className="text-muted">
              The Analytics settings are currently in a view only state, in order to update any of the settings please
              contact Opsera support.
            </Card.Subtitle>
          </Card.Body>
        </Card>
      )}
      {analyticsProfileData && analyticsProfileData.getData("active") && (
        <div>
          <Row>
            <Col lg={3}>
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Contact Opsera Support to disable analytics.</Tooltip>}
              >
                <span className="mr-3">
                  <DtoToggleInput
                    setDataObject={setAnalyticsProfileData}
                    fieldName={"active"}
                    dataObject={analyticsProfileData}
                    disabled={true}
                  />
                </span>
              </OverlayTrigger>
            </Col>
            <Col lg={12}>
              <DtoTextInput
                setDataObject={setAnalyticsProfileData}
                dataObject={analyticsProfileData}
                fieldName={"enabledToolsOn"}
                disabled={true}
              />
            </Col>
            <Col lg={12}>
              <DtoTextInput
                setDataObject={setAnalyticsProfileData}
                dataObject={analyticsProfileData}
                fieldName={"esInstanceURL"}
                disabled={true}
              />
            </Col>
            <Col lg={12}>
              <DtoSelectInput
                setDataObject={setAnalyticsProfileData}
                textField={"name"}
                valueField={"value"}
                dataObject={analyticsProfileData}
                filter={"contains"}
                selectOptions={DEFAULT_PERSONAS ? DEFAULT_PERSONAS : []}
                fieldName={"defaultPersona"}
                disabled={analyticsProfileData.getData("ldapAccount") && !analyticsProfileData.getData("ldapOwner")}
              />
            </Col>
            <Col lg={12}>
              <DtoMultiselectInput
                setDataObject={setAnalyticsProfileData}
                textField={"name"}
                valueField={"id"}
                dataObject={analyticsProfileData}
                filter={"contains"}
                selectOptions={[]}
                fieldName={"enabledIndexes"}
                busy={isLoading}
                disabled={true}
              />
            </Col>
          </Row>
          <div className="ml-auto mt-3">
            <SaveButton2
              updateRecord={updateProfile}
              setRecordDto={setAnalyticsProfileData}
              setData={setAnalyticsProfileData}
              // createRecord={createApplication}
              recordDto={analyticsProfileData}
            />
          </div>
        </div>
      )}
    </ScreenContainer>
  );
}

export default AnalyticsProfileSettings;
