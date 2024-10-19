/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, OnChange } from "@monaco-editor/react";
import { useState } from "react";

type Props = {
  language?: string;
  theme?: string;
  value: string;
  onChange: OnChange;
  options?: any;
};

const CodeEditor = ({
  language = "javascript",
  theme = "vs-light",
  value = "",
  onChange,
  options = {},
}: Props) => {
  const [editorValue, setEditorValue] = useState(value);

  const handleEditorChange: OnChange = (value, ev) => {
    setEditorValue(value || "");
    if (onChange) {
      onChange(value, ev);
    }
  };

  return (
    <Editor
      height={"100%"}
      language={language}
      theme={theme}
      value={editorValue}
      onChange={handleEditorChange}
      options={{
        fontSize: 14,
        wordWrap: "on",
        minimap: { enabled: false },
        automaticLayout: true,
        ...options,
      }}
    />
  );
};

export default CodeEditor;
