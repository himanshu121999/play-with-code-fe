import { Link } from "react-router-dom";

type Props = {
  assignment: {
    title: string;
    description: string;
    isCompleted: boolean;
    _id: string;
  };
};

const AssignmentCard = ({ assignment }: Props) => {
  return (
    <Link to={`/solve-assignment/${assignment?._id}`}>
      <div className="flex items-center gap-3 p-3 bg-white">
        {/* Title */}
        <div className="flex-1 font-medium text-slate-600 ">
          {assignment?.title}
        </div>

        {/* Option Buttons */}

        <div
          className={[
            assignment?.isCompleted ? "bg-green-400" : "bg-rose-400",
            "text-xs",
            "text-white",
            "px-2 py-1",
            "rounded-md",
          ]?.join(" ")}
        >
          {assignment?.isCompleted ? "Submitted" : "Not Submitted"}
        </div>
      </div>
    </Link>
  );
};

export default AssignmentCard;
