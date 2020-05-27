import React from "react";

import CreationModal from "./CreationModal";
import NewApplication from "./NewApplication";
import NewAppProvider from "./context";

import "./style.css";

function NewApp() {
  return (
    <NewAppProvider>
      <CreationModal />
      <NewApplication />
    </NewAppProvider>
  );
} 

export default NewApp;