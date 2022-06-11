import React, {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown';
import PropTypes from "prop-types";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

const ReactMarkdownWrapper = ({markdownFile}) => {
  const [postMarkdown, setPostMarkdown] = useState('');

  useEffect(() => {
    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        // Logs a string of Markdown content.
        // Now you could use e.g. <rexxars/react-markdown> to render it.
        // console.log(text);
        setPostMarkdown(text);
      });
  }, []);

  return (
    <div className={"m-4"}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // Use h2s instead of h1s
          // eslint-disable-next-line react/prop-types,react/display-name
          h4: ({node, ...props}) => <div style={{fontSize: "24px", color: "#3D3B36" }} {...props} />,
          // eslint-disable-next-line react/prop-types,react/display-name
          h5: ({node, ...props}) => <div style={{fontSize: "20px", color: "#3D3B36", display: "inline"}} {...props} />,
          // eslint-disable-next-line react/prop-types,react/display-name
          p: ({node, ...props}) => <div style={{color: "#6c757d"}} {...props} />,
          // eslint-disable-next-line react/prop-types,react/display-name
        }}
      >
        {postMarkdown}
      </ReactMarkdown>
    </div>
  );
};

ReactMarkdownWrapper.propTypes = {
  markdownFile: PropTypes.object,
  className: PropTypes.string,
};

export default ReactMarkdownWrapper;