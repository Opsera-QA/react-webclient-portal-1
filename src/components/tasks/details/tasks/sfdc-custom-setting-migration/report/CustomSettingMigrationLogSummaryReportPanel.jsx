import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle, faFileAlt } from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import customSettingMigrationReportMetadata from "./custom-setting-migration-report-metadata";
import { Col, Row } from "react-bootstrap";
import H4FieldSubHeader from "../../../../../common/fields/subheader/H4FieldSubHeader";
import TextFieldBase from "../../../../../common/fields/text/TextFieldBase";
import CustomSettingReportDownloadButton from "./CustomSettingReportDownloadButton";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import taskActions from "../../../../task.actions";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import useComponentStateReference from "../../../../../../hooks/useComponentStateReference";

function CustomSettingMigrationLogSummaryReportPanel({ activityData }) {
  const { getAccessToken } = useContext(AuthContext);
  const { userData } = useComponentStateReference();
  const [summaryData, setSummaryData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [runCount, setRunCount] = useState("");
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    initializeData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(activityData)]);

  const initializeData = async () => {
    try {
      let reportObject = activityData?.api_response?.summary;
      setRunCount(activityData?.run_count);
      setTaskId(activityData?.task_id);
      const task = await taskActions.getTaskByIdV2(getAccessToken, cancelTokenSource, activityData?.task_id);
      setTask(task);
      setSummaryData(new Model(reportObject, customSettingMigrationReportMetadata, false));
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const isDownloadAllowed = () => {
    if (!summaryData?.getData("hasDowloadableReport")) return false;
    const expiry = new Date(summaryData?.getData("expirationTime"));
    const currentDate = new Date();
    if (currentDate > expiry) {
      return false;
    }
    return TaskRoleHelper.canRunTask(userData, task);
  };

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        <VanitySetTabView tabKey={"summary"}>
          <SummaryPanelContainer className={"step-configuration-summary mx-3 mt-3"}>
            <Row className={"my-3"}>
              <Col lg={12}>
                <Row>
                  <Col lg={8}>
                    <H4FieldSubHeader subheaderText={"Execution Overview"}/>
                  </Col>
                  <Col lg={4}>
                    <CustomSettingReportDownloadButton
                      taskId={taskId}
                      runCount={runCount}
                      expiryDate={summaryData?.getData("expirationTime")}
                      visible={isDownloadAllowed()}
                    />
                  </Col>
                </Row>

              </Col>
              <Col lg={12}>
                <TextFieldBase dataObject={summaryData} fieldName={"queryFilter"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"status"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"timeTaken"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"recordsProcessed"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"recordsSuccessful"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"recordsFailed"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"errorMessage"} visible={summaryData?.getData("errorMessage") != ""}/>
              </Col>
            </Row>
          </SummaryPanelContainer>
        </VanitySetTabView>
      </VanitySetTabViewContainer>
    );
  };

  if (
    summaryData == null
    || isLoading
  ) {
    return (
      <LoadingDialog
        message={"Loading Summary Report"}
        size={'sm'}
      />
    );
  }

  return (
    <VanitySetTabAndViewContainer
      icon={faSalesforce}
      title={`Salesforce Custom Setting Migration Task Summary`}
      defaultActiveKey={"summary"}
      verticalTabContainer={
        <VanitySetVerticalTabContainer>
          <VanitySetVerticalTab
            icon={faFileAlt}
            tabText={"Overview"}
            tabName={"summary"}
          />
        </VanitySetVerticalTabContainer>
      }
      currentView={getTabContentContainer()}
    />
  );
}


CustomSettingMigrationLogSummaryReportPanel.propTypes = {
  activityData: PropTypes.object,
};

export default CustomSettingMigrationLogSummaryReportPanel;