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
import BooleanToggleInput from "../../../../common/inputs/boolean/BooleanToggleInput";
import GitCustodianBranchSelectInput from "./inputs/GitCustodianBranchSelectInput";
import GitCustodianCustomEntropyInput from "./inputs/GitCustodianCustomEntropyInput";
import GitCustodianEmailScanInput from "./inputs/GitCustodianEmailScanInput";
import GitCustodianRepoAndBranchMappingInput from "./inputs/GitCustodianRepoAndBranchMappingInput";
import GitCustodianAdvancedOptionsInput from "./inputs/GitCustodianAdvancedOptionsInput";

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

  const getRepoSelectionFields = () => {
    if (gitTasksConfigurationData?.getData("advancedOptions") === true ) {
      return null;
    }
    return (
      <>
        <Col lg={12}>
          <BooleanToggleInput
            setDataObject={setGitTasksConfigurationData}
            dataObject={gitTasksConfigurationData}
            fieldName={"scanAll"}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput
            setDataObject={setGitTasksConfigurationData}
            dataObject={gitTasksConfigurationData}
            fieldName={"scanOnlyBranch"}
          />
        </Col>
        <Col lg={12}>
          <GitCustodianBranchSelectInput 
            setModel={setGitTasksConfigurationData}
            model={gitTasksConfigurationData}
            fieldName={"gitBranch"}
          />
        </Col>
        {gitTasksConfigurationData?.getData("scanAll") !== true ? (
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
        ) : null }
      </>
    );
  };

  const getAdvancedOptionsFields = () => {
    if (gitTasksConfigurationData?.getData("advancedOptions") !== true ) {
      return null;
    }
    return (
      <Col lg={12}>
        <GitCustodianRepoAndBranchMappingInput 
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"reposToScan"}
          type={"Repository Mappings"}
          allowIncompleteItems={false}
        />
      </Col>      
    );
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
        <GitCustodianEmailScanInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"scanEmail"}
        />
      </Col>
      <Col lg={12}>
        <GitCustodianCustomEntropyInput
          model={gitTasksConfigurationData}
          setModel={setGitTasksConfigurationData}
          fieldName={"customEntropy"}
        />
      </Col>
      <Col lg={12}>
        <GitCustodianAdvancedOptionsInput 
          setModel={setGitTasksConfigurationData}
          model={gitTasksConfigurationData}
          fieldName={"advancedOptions"}
        />
      </Col>
      {getRepoSelectionFields()}
      {getAdvancedOptionsFields()}
    </Row>
  );
}

GitScraperConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default GitScraperConfigurationPanel;
