import React from "react";
import generalFaq from 'markdown/faq/general/general.faq.md';
import ReactMarkdownWrapper from "components/common/markdown/ReactMarkdownWrapper";

const GeneralFrequentlyAskedQuestions = () => {
  return (
      <ReactMarkdownWrapper
        markdownFile={generalFaq}
        className={"m-4"}
      />
  );
};


export default GeneralFrequentlyAskedQuestions;