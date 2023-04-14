import React from "react";
import toolregistryFaq from '@opsera/react-faq-markdown/src/markdown/faq/tool_registry/toolregistry.faq.md';
import {ReactMarkdownWrapper} from "@opsera/react-vanity-set/dist/makeup-and-vanity-set.module.modern";

const ToolRegistryFrequentlyAskedQuestions = () => {
  return (
      <ReactMarkdownWrapper
        markdownFile={toolregistryFaq}
        className={"m-4"}
      />
  );
};


export default ToolRegistryFrequentlyAskedQuestions;