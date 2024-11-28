/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PastClassCard from "../../components/PastClassCard/PastClassCard";
import { useGetCourseClassesQuery } from "../../services/CourseClassServices";

const ViewNotes = () => {
  const [searchQuery] = useSearchParams();
  const navigate = useNavigate();

  const classLink = searchQuery.get("class-link");
  const topicName = searchQuery.get("topic-name");

  const { data: courseClassesData } = useGetCourseClassesQuery("");

  return (
    <div className="flex h-full overflow-auto">
      <div className="flex flex-col flex-1 gap-4 p-4">
        <div className="flex items-center gap-2 text-xl font-semibold text-slate-800">
          {" "}
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className="p-1.5 cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {" "}
            <IconArrowLeft />{" "}
          </div>{" "}
          {topicName}
        </div>

        <iframe
          src={classLink || ""}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-2 py-4 bg-gray-100 w-[600px] h-full overflow-auto">
        <div className="px-4 text-xl font-medium text-slate-600">
          Recent Classes
        </div>

        <div className="flex-1 space-y-2 overflow-auto">
          {courseClassesData?.map((courseClassData: any) => {
            return (
              <PastClassCard
                key={courseClassesData?._id}
                courseClassData={courseClassData}
                isPlaying={classLink === courseClassData?.classLink}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;
