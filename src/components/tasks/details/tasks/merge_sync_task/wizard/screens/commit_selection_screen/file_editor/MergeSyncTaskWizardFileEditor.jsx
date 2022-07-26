import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InfoContainer from "components/common/containers/InfoContainer";
import { faCode } from "@fortawesome/pro-light-svg-icons";
import SyntaxHighlighterFieldBase from "components/common/fields/code/syntax_highlighter/SyntaxHighlighterFieldBase";
import { hasStringValue } from "components/common/helpers/string-helpers";
import CodeInput, { CODE_THEME_TYPES } from "components/common/inputs/code/CodeInput";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import MergeSyncTaskWizardSubmitEditedFileButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/file_editor/MergeSyncTaskWizardSubmitEditedFileButton";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";
import SyntaxHighlighterCodeFieldBase from "components/common/fields/code/syntax_highlighter/SyntaxHighlighterCodeFieldBase";

function MergeSyncTaskWizardFileEditor(
  {
    wizardModel,
    comparisonFileModel,
    setComparisonFileModel,
    fileContentFieldName,
    isLoading,
    className,
    language,
  }) {
  if (hasStringValue(fileContentFieldName) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <div style={{ overflowX: "hidden" }} className={"my-2"}>
        <Row>
          <Col xs={12} md={6} className={"pr-1"}>
            <SyntaxHighlighterCodeFieldBase
              titleText={comparisonFileModel?.getLabel(fileContentFieldName)}
              isLoading={isLoading}
              backgroundColor={"rgb(43, 43, 43)"}
              wrapLines={true}
              wrapLongLines={true}
              showLineNumbers={false}
              showInlineLineNumbers={false}
              code={comparisonFileModel?.getData(fileContentFieldName)}
              language={language}
            />
          </Col>
          <Col xs={12} md={6} className={"pl-1"}>
            <CodeInput
              className={"my-0"}
              model={comparisonFileModel}
              setModel={setComparisonFileModel}
              customTitleText={"File Editor"}
              isDataPulled={true}
              fieldName={"manualContent"}
              mode={"xml"}
              theme={CODE_THEME_TYPES.DARK}
            />
          </Col>
        </Row>
      </div>
      <ButtonContainerBase
        className={"mt-2"}
      >
        <MergeSyncTaskWizardSubmitEditedFileButton
          fileName={comparisonFileModel?.getData("file")}
          fileContent={comparisonFileModel?.getData("manualContent")}
          comparisonFileModel={comparisonFileModel}
          wizardModel={wizardModel}
        />
      </ButtonContainerBase>
    </div>
  );
}

MergeSyncTaskWizardFileEditor.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileContentFieldName: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  maximumHeight: PropTypes.string,
  minimumHeight: PropTypes.string,
  language: PropTypes.string,
};

export default MergeSyncTaskWizardFileEditor;