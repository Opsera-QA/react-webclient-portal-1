import React, { useEffect, useState } from "react";

function PersistentInformationMessage() {
  const [informationMessage, setInformationMessage] = useState(undefined);

  useEffect(() => {
    pullDatabaseMessage();
  }, []);

  // TODO: Add API Call to pull DB Message
  const pullDatabaseMessage = async () => {
    // setInformationMessage("This message will be pulled from the DB");
  }

  if (informationMessage == null || informationMessage === "") {
    return null;
  }

  return (
    <div className="w-100 info-block top-dialog-block-static">
      <span>{informationMessage}</span>
    </div>
  );
}

PersistentInformationMessage.propTypes = {
};

export default PersistentInformationMessage;