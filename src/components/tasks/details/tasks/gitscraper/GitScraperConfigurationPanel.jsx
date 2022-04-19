import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import gitscraperTaskConfigurationMetadata from "./gitscraper-metadata";
import GitScraperLibrarySelectInput from "./inputs/GitScraperLibrarySelectInput";
import GitScraperScmToolTypeSelectInput from "./inputs/GitScraperScmToolTypeSelectInput";
import GitScraperScmToolSelectInput from "./inputs/GitScraperScmToolSelectInput";
import NumberPickerInputBase from "../../../../common/inputs/number/picker/base/NumberPickerInputBase";
import GitIgnoreToggleInput from "./inputs/GitIgnoreToggleInput";
import GitScraperRepos from "./repos_table/GitScraperRepos";

function GitScraperConfigurationPanel({
  gitTasksDataDto,
  gitTasksConfigurationData,
  setGitTasksConfigurationData,
}) {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      gitTasksDataDto.getData("configuration"),
      gitscraperTaskConfigurationMetadata,
    );
    setGitTasksConfigurationData({ ...configurationData });
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <GitScraperLibrarySelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={false}
          fieldName={"type"}
        />
        <NumberPickerInputBase
          fieldName={"threshold"}
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
        />
        <GitIgnoreToggleInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"secretsException"}
        />
        <GitScraperRepos
          toolApplications={gitTasksConfigurationData?.getData("reposToScan")}
          isLoading={false}
          setParentDataObject={setGitTasksConfigurationData}
          parentDataObject={gitTasksDataDto}
          loadData={loadData}
          />
      </Col>
    </Row>
  );
}

GitScraperConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default GitScraperConfigurationPanel;
