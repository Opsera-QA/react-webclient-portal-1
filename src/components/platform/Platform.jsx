import React, { useContext } from "react";

import CreationModal from "./CreationModal";
import NewApplication from "./NewApplication";
import Application from "./Application";
import NewAppProvider from "./context";

import "./style.css";

function Platform() {

  return (
    <>
      <div className="mt-3 max-content-width">
        <NewAppProvider>
          <CreationModal />
          <Application />
        </NewAppProvider>
      </div>
    </>
  );
} 

export default Platform;