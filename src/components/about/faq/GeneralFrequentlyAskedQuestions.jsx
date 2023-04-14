import React from "react";
import generalFaq from '@opsera/react-faq-markdown/src/markdown/faq/general/general.faq.md';
import {ReactMarkdownWrapper} from "@opsera/react-vanity-set/dist/makeup-and-vanity-set.module.modern";

const GeneralFrequentlyAskedQuestions = () => {
  return (
      <ReactMarkdownWrapper
        markdownFile={generalFaq}
        className={"m-4"}
      />
  );
};


export default GeneralFrequentlyAskedQuestions;