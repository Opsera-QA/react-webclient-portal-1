import React from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function SearchInput({ org, loading, orgSearch, handleChange }) {
  return (
    <>
      <Form onSubmit={orgSearch}>
        <Form.Row>
          <Form.Group controlId="formGridName">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="org" placeholder="Organization Name"
              value={org}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      
      <Button variant="outline-primary" type="submit" loading={loading ? "true" : undefined} onClick={orgSearch}>
        Search
      </Button>
    </>
  );
}

SearchInput.propTypes = {
  org: PropTypes.string,
  loading: PropTypes.bool,
  orgSearch: PropTypes.func,
  handleChange: PropTypes.func
};

export default SearchInput;
