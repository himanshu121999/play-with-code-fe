import { IconX } from "@tabler/icons-react";
// import { assignments } from "../../../../../database";

type Props = {
  onClose: () => void;
};

const AssignmentsDrawer = ({ onClose }: Props) => {
  // const getComplexityClasses = (complexity: string) => {
  //   switch (complexity) {
  //     case "EASY":
  //       return "text-green-500";
  //     case "MEDIUM":
  //       return "text-yellow-500";
  //     case "HARD":
  //       return "text-red-500";

  //     default:
  //       break;
  //   }
  // };

  const handleClose = () => {
    document.getElementById("drawer")?.classList.add("animate-drawer-reverse");
    setTimeout(() => {
      onClose();
    }, 500);
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

        {/* <div className="flex-1 p-4 space-y-2 overflow-auto">
          {assignments?.map((assignment) => {
            return (
              <div
                onClick={() => {
                  handleClose();
                }}
                className="flex items-center gap-2 p-2 rounded-md cursor-pointer odd:bg-gray-100"
              >
                <div className="flex-1"> {assignment?.title} </div>

                <div
                  className={`text-xs w-[60px] text-end ${getComplexityClasses(
                    assignment?.complexity
                  )}`}
                >
                  {assignment?.complexity}
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default AssignmentsDrawer;
