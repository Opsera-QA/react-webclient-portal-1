import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { faCheckCircle, faFileAlt } from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetTabView from "../../../../common/tabs/vertical_tabs/VanitySetTabView";
import SummaryPanelContainer from "../../../../common/panels/detail_view/SummaryPanelContainer";
import customSettingMigrationReportMetadata from "./custom-setting-migration-report-metadata";
import { Col, Row } from "react-bootstrap";
import H4FieldSubHeader from "../../../../../common/fields/subheader/H4FieldSubHeader";
import TextFieldBase from "../../../../../common/fields/text/TextFieldBase";

function CustomSettingMigrationLogSummaryReportPanel({ activityData }) {
  const [summaryData, setSummaryData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    initializeData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(activityData)]);

  const initializeData = async () => {
    try {
      let reportObject = activityData?.api_response?.summary;
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

  const getTabContentContainer = () => {
    return (
      <VanitySetTabViewContainer>
        <VanitySetTabView tabKey={"summary"}>
          <SummaryPanelContainer className={"step-configuration-summary mx-3 mt-3"}>
            <Row className={"my-3"}>
              <Col lg={12}><H4FieldSubHeader subheaderText={"Execution Overview"}/></Col>
              <Col lg={12}>
                <TextFieldBase dataObject={summaryData} fieldName={"filterQuery"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"recordsProcessed"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"recordsSuccessful"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"recordsSuccessful"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"recordsFailed"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"timeTaken"} />
              </Col>
              <Col lg={6}>
                <TextFieldBase dataObject={summaryData} fieldName={"errorMessage"} />
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