import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const PLATFORM_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "GitLab" },
  { value: "github", label: "GitHub" }
];


function SourceRepositoryConfig( { data, parentCallback }) {
  const { source } = data.workflow;
  const [platform, setPlatform] = useState(source.name);
  const [repository, setRepository] = useState(source.repository ? source.repository : "");
  const [branch, setBranch] = useState(source.branch ? source.branch : "");
  
  const handleSelectChange = (selectedOption) => {
    setPlatform(selectedOption.value);    
  };

  const callbackFunction = () => {
    const item = {
      name: platform,
      repository: repository,
      branch: branch
    };
    parentCallback(item);
  };

  return (
    <Form>
      
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Platform</Form.Label>
        <Select
          className="basic-single mr-2"
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          classNamePrefix="select"
          defaultValue={platform ? PLATFORM_OPTIONS[PLATFORM_OPTIONS.findIndex(x => x.value ===platform)] : PLATFORM_OPTIONS[0]}
          isDisabled={false}
          isClearable={false}
          isSearchable={true}
          name="PLATFORM-SELECT"
          options={PLATFORM_OPTIONS}
          onChange={handleSelectChange}
        />
      </Form.Group>

      <Form.Group controlId="repoField">
        <Form.Label>Repository</Form.Label>
        <Form.Control type="text" placeholder="" value={repository} onChange={e => setRepository(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Branch</Form.Label>
        <Form.Control type="text" placeholder="" value={branch} onChange={e => setBranch(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }} 
        disabled={repository.length == 0 || branch.length == 0 || platform.length == 0}>
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
    </Form>
  );
}

SourceRepositoryConfig.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default SourceRepositoryConfig;