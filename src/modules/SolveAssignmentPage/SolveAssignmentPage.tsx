import {
  IconChevronLeft,
  IconChevronRight,
  IconListDetails,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";
import { useState } from "react";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import AssignmentsDrawer from "./components/AssignmentsDrawer";

const SolveAssignmentPage = () => {
  // const [consoleOutput, setConsoleOutput] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("index.html");
  const [files, setFiles] = useState([
    {
      fileName: "index.html",
      language: "html",
      value: "",
    },
    {
      fileName: "style.css",
      language: "css",
      value: "",
    },
  ]);
  const [fullscreen, setFullscreen] = useState<"QUESTION" | "CODE" | null>(
    null
  );
  const [isShowAssignmentDrawer, setIsShowAssignmentDrawer] = useState(false);

  // const customConsole: any = {
  //   log: (...args: any[]) => {
  //     const formattedOutput = args
  //       .map((arg) =>
  //         typeof arg === "object" ? JSON.stringify(arg) : String(arg)
  //       )
  //       .join(" ");
  //     setConsoleOutput((prev) => prev + formattedOutput + "\n");
  //   },
  //   clear: () => {
  //     setConsoleOutput("");
  //   },
  // };

  // Overriding the global console.log with your custom implementation
  // window.console = customConsole;

  const handleChange = (fileName: string, value: string) => {
    const newFilesValue = files.map((file) => {
      if (file.fileName === fileName) {
        return {
          ...file,
          value: value,
        };
      } else {
        return file;
      }
    });

    setFiles(newFilesValue);
  };

  // console.log(files?.find((file) => file.fileName === selectedFileName)
  // ?.value)

  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      <div className="flex justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsShowAssignmentDrawer(true)}
            className="flex items-center gap-1 px-2 py-1 text-lg font-medium rounded cursor-pointer text-slate-700 hover:bg-stone-200"
          >
            <IconListDetails /> Assignments
          </div>

          <div className="flex items-center gap-1">
            <button type="button" className="p-1 rounded-md hover:bg-stone-200">
              <IconChevronLeft />
            </button>
            <button type="button" className="p-1 rounded-md hover:bg-stone-200">
              <IconChevronRight />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="px-4 py-1.5 font-medium text-white rounded bg-emerald-600"
          onClick={() => {}}
        >
          Submit
        </button>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-3 px-3 pb-3 ">
        {/* Question */}
        <div
          className={`flex flex-col bg-white border border-gray-200 rounded-md shadow ${
            fullscreen === null
              ? "col-span-1"
              : fullscreen === "QUESTION"
              ? "col-span-full"
              : "hidden"
          } `}
        >
          <div className="flex justify-end p-2 rounded-t bg-stone-100">
            {fullscreen === "QUESTION" ? (
              <IconMinimize
                size={18}
                onClick={() => {
                  setFullscreen(null);
                }}
              />
            ) : (
              <IconMaximize
                size={18}
                onClick={() => {
                  setFullscreen("QUESTION");
                }}
              />
            )}
          </div>

          <div
            className="flex-1 p-2"
            dangerouslySetInnerHTML={{
              __html: `Imagine we're developing a utility feature for a time management
            application. our goal is to create a function that efficiently
            converts time input in hours, minutes, and seconds into total
            seconds. this function should accurately calculate the total seconds
            based on the provided time components using basic arithmetic
            operations, offering users a convenient way to work with time
            durations in seconds.<br/> <br/>example:<br/> <br/>Input: <br/> <b> hours: 2 <br/>
            minutes: 30 <br/> seconds: 45 </b> <br/> <br/>  output: <br/> <b> total seconds: 9045 </b>`,
            }}
          ></div>
        </div>

        <div
          className={`flex flex-col bg-white border border-gray-200 rounded-md shadow h-full ${
            fullscreen === null
              ? "col-span-1"
              : fullscreen === "CODE"
              ? "col-span-full"
              : "hidden"
          } `}
        >
          {/* Code Editor */}
          <div
            className={`flex flex-col bg-white flex-1 rounded-md ${
              fullscreen === null
                ? "col-span-1"
                : fullscreen === "CODE"
                ? "col-span-full"
                : "hidden"
            } `}
          >
            <div className="flex items-center justify-between p-2 rounded-t bg-stone-100">
              <div className="flex items-center gap-2">
                {files?.map((file) => {
                  const isSelected = file.fileName === selectedFileName;
                  return (
                    <div
                      onClick={() => {
                        setSelectedFileName(file.fileName);
                      }}
                      className={`cursor-pointer px-2 py-1 rounded-md font-medium text-slate-700 ${
                        isSelected && "bg-gray-200"
                      }`}
                    >
                      {file.fileName}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // customConsole.clear();
                    // executeCode(value);
                  }}
                  className="px-2 py-1 text-sm font-medium text-white rounded-md bg-emerald-600"
                >
                  {" "}
                  Run Code{" "}
                </button>

                {fullscreen === "CODE" ? (
                  <IconMinimize
                    size={18}
                    onClick={() => {
                      setFullscreen(null);
                    }}
                  />
                ) : (
                  <IconMaximize
                    size={18}
                    onClick={() => {
                      setFullscreen("CODE");
                    }}
                  />
                )}
              </div>
            </div>

            <div className="flex-1 py-2">
              <CodeEditor
                value={
                  files?.find((file) => file.fileName === selectedFileName)
                    ?.value || ""
                }
                onChange={(newValue) =>
                  handleChange(selectedFileName, newValue || "")
                }
                language={
                  files?.find((file) => file.fileName === selectedFileName)
                    ?.language
                }
              />
            </div>
          </div>

          {/* Console */}
          <div className={`flex flex-col bg-white h-[300px] `}>
            <div className="flex p-2 text-sm font-medium rounded-t bg-stone-100 text-slate-600">
              Output
            </div>

            <div className="flex-1 p-4 py-2 overflow-auto">
              {/* <pre className={`${isError ? "text-red-400" : ""}`}>
                {consoleOutput}
              </pre> */}
            </div>
          </div>
        </div>
      </div>

      {isShowAssignmentDrawer && (
        <AssignmentsDrawer onClose={() => setIsShowAssignmentDrawer(false)} />
      )}
    </div>
  );
};

export default SolveAssignmentPage;
