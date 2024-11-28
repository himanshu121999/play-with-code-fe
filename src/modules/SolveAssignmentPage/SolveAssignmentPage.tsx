/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconArrowLeft,
  IconCircleCheckFilled,
  IconListDetails,
  IconMaximize,
  IconMinimize,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import {
  useGetAssignmentByIdQuery,
  useSubmitAssignmentMutation,
} from "../../services/AsignmentServices";
import AssignmentsDrawer from "./components/AssignmentsDrawer";

const SolveAssignmentPage = () => {
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

  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetAssignmentByIdQuery(assignmentId);

  const [submitAssignment] = useSubmitAssignmentMutation();

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

  useEffect(() => {
    setFiles(data?.submission?.files);
  }, [data]);

  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      <div className="flex justify-between gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          {/* Back Button Icon */}
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className="p-1.5 cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {" "}
            <IconArrowLeft />{" "}
          </div>{" "}
          <div
            onClick={() => setIsShowAssignmentDrawer(true)}
            className="flex items-center gap-1 px-2 py-1 text-lg font-medium rounded cursor-pointer text-slate-700 hover:bg-stone-200"
          >
            <IconListDetails /> Assignments
          </div>
          {/* <div className="flex items-center gap-1">
            <button type="button" className="p-1 rounded-md hover:bg-stone-200">
              <IconChevronLeft />
            </button>
            <button type="button" className="p-1 rounded-md hover:bg-stone-200">
              <IconChevronRight />
            </button>
          </div> */}
        </div>

        <button
          type="button"
          className="px-4 py-1.5 font-medium text-white rounded bg-emerald-600"
          onClick={() => {
            submitAssignment({ assignmentId, body: { files } });
          }}
        >
          {data?.isCompleted ? "Re-Submit" : "Submit"}
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
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-green-400 rounded-md ${
                  data?.isCompleted ? "visible" : "invisible"
                }`}
              >
                <IconCircleCheckFilled size={24} stroke={4} />{" "}
                <div> Completed </div>
              </div>

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
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-4 p-4">
              {Array(4)
                ?.fill(null)
                ?.map(() => {
                  return (
                    <div
                      className={`h-5 bg-gray-200 rounded-md animate-pulse`}
                    ></div>
                  );
                })}
            </div>
          ) : (
            <div className="flex flex-col gap-6 p-4">
              <div className="text-lg font-medium text-slate-800">
                {data?.title}{" "}
              </div>
              <div
                className="flex-1 unstyled"
                dangerouslySetInnerHTML={{
                  __html: (data as any)?.description,
                }}
              ></div>
            </div>
          )}
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
              {isLoading ? (
                <div className="bg-gray-200 animate-pulse h-[30px] w-[100px] rounded-md"></div>
              ) : (
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
              )}

              <div className="flex items-center gap-2">
                {data?.allowOutput && (
                  <button
                    type="button"
                    onClick={() => {}}
                    className="px-2 py-1 text-sm font-medium text-white rounded-md bg-emerald-600"
                  >
                    {" "}
                    Run Code{" "}
                  </button>
                )}

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

            {isLoading ? (
              <div className="flex items-center justify-center flex-1 text-2xl animate-pulse text-slate-700">
                {" "}
                Loading...{" "}
              </div>
            ) : (
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
            )}
          </div>

          {/* Console */}
          {data?.allowOutput && (
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
          )}
        </div>
      </div>

      {isShowAssignmentDrawer && (
        <AssignmentsDrawer onClose={() => setIsShowAssignmentDrawer(false)} />
      )}
    </div>
  );
};

export default SolveAssignmentPage;
