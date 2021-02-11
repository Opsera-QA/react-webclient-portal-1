import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

function AccessTokenLogPanel({ accessToken }) {
  const [isLoading, setIsLoading] = useState(false);
  const [accessTokenLogs, setAccessTokenLogs] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // setAccessTokenLogs(toolData);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (<></>);
}

AccessTokenLogPanel.propTypes = {
  toolData: PropTypes.object,
  setActiveTab: PropTypes.func,
  customerAccessRules: PropTypes.object,
}

export default AccessTokenLogPanel;
