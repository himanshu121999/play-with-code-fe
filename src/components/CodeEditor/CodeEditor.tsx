/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor, OnChange } from "@monaco-editor/react";

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
  // const [editorValue, setEditorValue] = useState(value);

  const handleEditorChange: OnChange = (value, ev) => {
    if (onChange) {
      // onChange(value || "");
      onChange(value, ev);
    }
  };

  return (
    <Editor
      height={"100%"}
      language={language}
      theme={theme}
      value={value}
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
