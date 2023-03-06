import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApexClassProfleEditorView from "./profile_editor_views/ApexClassProfleEditorView";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";
import CustomMetadataProfileEditorView from "./profile_editor_views/CustomMetadataProfileEditorView";
import { AuthContext } from "../../../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../../../contexts/DialogToastContext";
import useComponentStateReference from "../../../../../../../../../../hooks/useComponentStateReference";
import { hasStringValue } from "../../../../../../../../../common/helpers/string-helpers";
import mergeSyncTaskWizardActions from "../../../../mergeSyncTaskWizard.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CustomSettingssProfileEditorView from "./profile_editor_views/CustomSettingssProfileEditorView";
import ExternalDataSourceProfileEditorView from "./profile_editor_views/ExternalDataSourceProfileEditorView";
import LayoutProfileEditorView from "./profile_editor_views/LayoutProfileEditorView";
import FlowProfileEditorView from "./profile_editor_views/FlowProfileEditorView";
import ApexPageProfileEditorView from "./profile_editor_views/ApexPageProfileEditorView";
import { mockData } from "../MergeSyncTaskWizardProfilesAdvancedEditingPanel";
import IconBase from "../../../../../../../../../common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";

const MergeSyncTaskWizardApexPageJsonEditPanel = ({
  wizardModel,
  comparisonFileModel,
  setComparisonFileModel,
  fileName,
  isLoading,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [isJsonLoading, setIsJsonLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  const [modifiedContentJson, setModifiedContentJson] = useState(undefined);
  const [originalContentJson, setOriginalContentJson] = useState(undefined);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (hasStringValue(fileName)) {
      loadJsonData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [fileName]);

  const loadJsonData = async () => {
    try {
      setIsJsonLoading(true);
      // TODO : Convert both original and modified contents to JSON

      const jsonContent = mockData;
      // await mergeSyncTaskWizardActions.componentTypeConvertView(
      //   getAccessToken,
      //   cancelTokenSource,
      //   wizardModel,
      //   fileName,
      //   "ApexPage",
      // );

      if (isMounted?.current === true) {
        setModifiedContentJson(
          // JSON.parse(
          DataParsingHelper.safeObjectPropertyParser(
            jsonContent,
            "data.message.sourceContent",
          ),
          // ),
        );
        setOriginalContentJson(
          // JSON.parse(
          DataParsingHelper.safeObjectPropertyParser(
            jsonContent,
            "data.message.destinationContent",
          ),
          // ),
        );
      }
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsJsonLoading(false);
      }
    }
  };

  if (isJsonLoading || isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Conversion in progress"}
      />
    );
  }
  const updateSearchText = (value) => {
    setSearchText(value);
  };
  const getSearchBar = () => {
    return (
      <div className="membership-search d-flex mx-auto">
        <IconBase
          icon={faSearch}
          iconClassName={"mr-2 opsera-dark-purple h-100"}
        />
        <input
          placeholder="Search"
          value={searchText}
          className="form-control"
          onChange={(event) => updateSearchText(event.target.value)}
        />
      </div>
    );
  };
  const setPageAccessDataJson = (modifiedValue) => {
    let newModifiedJson = { ...modifiedContentJson };
    let modifiedItem = newModifiedJson?.pageAccesses.find(
      (pageAccessData) => pageAccessData.apexPage === modifiedValue.apexPage,
    );
    if (modifiedItem) {
      modifiedItem.enabled = modifiedValue.enabled;
    }
    setModifiedContentJson(newModifiedJson);
  };

  const modifiedCustomMetaEditView = () => {
    return (
      <Col>
        <span className="h5">Source Profiles</span>
        {modifiedContentJson &&
          Object.keys(modifiedContentJson).length > 0 &&
          modifiedContentJson?.pageAccesses
            ?.filter((obj) => {
              return obj?.apexPage
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((pageAccessData, idx, { length }) => (
              <div key={idx}>
                <ApexPageProfileEditorView
                  pageAccessData={pageAccessData}
                  setPageAccessDataJson={setPageAccessDataJson}
                  isLoading={isLoading}
                />
                {idx + 1 !== length && (
                  <DividerWithCenteredText className={"m-4"} />
                )}
              </div>
            ))}
      </Col>
    );
  };

  const originalCustomMetaEditView = () => {
    return (
      <Col>
        <span className="h5">Target Profiles</span>
        {originalContentJson &&
          Object.keys(originalContentJson).length > 0 &&
          originalContentJson?.pageAccesses
            ?.filter((obj) => {
              return obj?.apexPage
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((pageAccessData, idx, { length }) => (
              <div key={idx}>
                <ApexPageProfileEditorView
                  pageAccessData={pageAccessData}
                  setPageAccessDataJson={setPageAccessDataJson}
                  isLoading={isLoading}
                />
                {idx + 1 !== length && (
                  <DividerWithCenteredText className={"m-4"} />
                )}
              </div>
            ))}
      </Col>
    );
  };
  return (
    <div className={"mt-4"}>
      <Row className={"mb-4"}>{getSearchBar()}</Row>
      <Row>
        {originalCustomMetaEditView()}
        {modifiedCustomMetaEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardApexPageJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardApexPageJsonEditPanel;
