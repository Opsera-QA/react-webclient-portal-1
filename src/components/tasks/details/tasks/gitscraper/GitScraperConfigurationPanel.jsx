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
import GitIgnoreToggleInput from "./inputs/GitIgnoreToggleInput";
import RepoSelectionView from "./inputs/RepoSelectionView";
import GitScraperBitbucketWorkspaceSelectInput from "./inputs/GitScraperBitbucketWorkspaceSelectInput";

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
      {/*<Col lg={12}>*/}
      {/*  <GitScraperLibrarySelectInput*/}
      {/*    dataObject={gitTasksConfigurationData}*/}
      {/*    setDataObject={setGitTasksConfigurationData}*/}
      {/*    disabled={false}*/}
      {/*    fieldName={"type"}*/}
      {/*  />*/}
      {/*</Col>*/}
      <Col lg={12}>
        <GitScraperScmToolTypeSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
        />
      </Col>

      <Col lg={12}>
        <GitScraperScmToolSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
        />
      </Col>
      <Col lg={12}>
        <GitScraperBitbucketWorkspaceSelectInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          service={gitTasksConfigurationData?.getData("service")}
          gitToolId={gitTasksConfigurationData?.getData("gitToolId")}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          fieldName={"threshold"}
            dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
        />
      </Col>
      <Col lg={12}>
        <GitIgnoreToggleInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"secretsException"}
        />
      </Col>
      <Col lg={12}>
        <RepoSelectionView
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          service={gitTasksConfigurationData?.getData("service")}
          gitToolId={gitTasksConfigurationData?.getData("gitToolId")}
          workspace={gitTasksConfigurationData?.getData("workspace")}
          disabled={
            gitTasksConfigurationData?.getData("service")?.length === 0 ||
            gitTasksConfigurationData?.getData("gitToolId")?.length === 0
          }
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
