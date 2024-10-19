import { lazy, Suspense } from "react";

const IconEye = lazy(() =>
  import("@tabler/icons-react").then((module) => ({ default: module.IconEye }))
);
const IconPaperclip = lazy(() =>
  import("@tabler/icons-react").then((module) => ({
    default: module.IconPaperclip,
  }))
);
import Checkbox from "../../../components/Checkbox/Checkbox";

const AssignmentCard = () => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white">
      {/* Checkbox */}
      <Checkbox
        checked={false}
        onChange={(value) => {
          console.log(value);
        }}
      />

      {/* Title */}
      <div className="flex-1 font-medium text-slate-600 ">
        {" "}
        Design a login page like this attachment{" "}
      </div>

      {/* Option Buttons */}
      <div className="flex items-center gap-2 text-slate-500 ">
        <button type="button" className="p-2 rounded-md hover:bg-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            <IconPaperclip size={16} />
          </Suspense>
        </button>
        <button type="button" className="p-2 rounded-md hover:bg-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            <IconEye size={16} />
          </Suspense>
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
