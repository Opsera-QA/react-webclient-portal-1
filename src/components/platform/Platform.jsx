import React, { useContext } from "react";

import CreationModal from "./CreationModal";
import NewApplication from "./NewApplication";
import NewAppProvider from "./context";

import "./style.css";

function Platform() {

  return (
    <>
      <div className="mt-3 max-content-width">
        <NewAppProvider>
          <CreationModal />
          <NewApplication />
        </NewAppProvider>
      </div>
    </>
  );
} 

export default Platform;