import { IconCheck, IconX } from "@tabler/icons-react";
import { useGetAssignmentsQuery } from "../../../services/AsignmentServices";
import { Assignment } from "../../../models/Assignment";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  onClose: () => void;
};

const AssignmentsDrawer = ({ onClose }: Props) => {
  const { assignmentId } = useParams();

  const { data: assignmentData } = useGetAssignmentsQuery("");

  const navigate = useNavigate();

  const handleAssignmentClick = (assignmentId: string) => {
    navigate(`/solve-assignment/${assignmentId}`);
  };

  const handleClose = () => {
    document.getElementById("drawer")?.classList.add("animate-drawer-reverse");
    onClose();
  };

  return (
    <div className="fixed w-screen h-screen bg-gray-700 bg-opacity-10">
      <div
        id="drawer"
        className="w-[500px] h-full shadow border-r flex flex-col animate-drawer bg-white"
      >
        <div className="flex justify-between px-4 py-3 border-b shadow-sm">
          <div className="text-xl font-medium text-slate-700">Assignments</div>
          <IconX onClick={handleClose} className="cursor-pointer" />
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-auto">
          {assignmentData?.map((assignment: Assignment) => {
            const isSelected = assignment?._id === assignmentId;

            return (
              <div
                onClick={() => {
                  handleAssignmentClick(assignment?._id);
                  handleClose();
                }}
                className={[
                  "flex",
                  "items-center",
                  "gap-3",
                  "p-2",
                  "rounded-md",
                  "cursor-pointer",
                  isSelected ? "bg-sky-100" : "",
                ].join(" ")}
              >
                <div className="flex-1"> {assignment?.title} </div>
                <div
                  className={`flex items-center justify-center p-1 text-white bg-green-400 rounded-full ${
                    assignment?.isCompleted ? "blcok" : "hidden"
                  }`}
                >
                  {" "}
                  <IconCheck size={16} stroke={4} />{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssignmentsDrawer;
