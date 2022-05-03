import React, {useContext, useEffect, useRef, useState} from "react";
import GitScraperReposTable from "./GitScraperReposTable";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

function GitScraperRepos({ setParentDataObject, isLoading, toolApplications, parentDataObject }) {
  const [gitScraperRepos, setGitScraperRepos] = useState([]);

  useEffect(() => {
    setGitScraperRepos(toolApplications);
  }, [toolApplications]);

  if (parentDataObject?.isNew()) {
    return (
      <Card className={"mt-3 mb-1"}>
        <Card.Header as="h6">Configure Repositories</Card.Header>
        <Card.Body>
          <Card.Text>
            Repositories for the scan can be configured by clicking on the settings icon once the task has been created.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <GitScraperReposTable
      isLoading={isLoading}
      setParentDataObject={setGitScraperRepos}
      parentDataObject={parentDataObject}
      gitScraperRepos={gitScraperRepos}
    />
  );
}

GitScraperRepos.propTypes = {
  setParentDataObject: PropTypes.func,
  parentDataObject: PropTypes.object,
  isLoading: PropTypes.bool,
  toolApplications: PropTypes.array
};
export default GitScraperRepos;
