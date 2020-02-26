import React, { useState } from "react";
import PropTypes from "prop-types";
import ActivityLogView from "../analytics/logs/activityLogView";
import { Form, Button } from "react-bootstrap";

function LogsDashboard( { persona } ) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Form>
        <div className="d-flex mt-3">
          <div className="p-2 flex-grow-1">          
            <Form.Control placeholder="Search logs" disabled />
          </div>
          <div className="p-2">
            <Button variant="primary" type="submit" disabled>Search</Button>
          </div>
        </div>
      </Form>
      

      <div className="mt-3">
        <ActivityLogView persona={persona}  />
      </div>
    </>
  );
}

LogsDashboard.propTypes = {
  persona: PropTypes.string
};

export default LogsDashboard;