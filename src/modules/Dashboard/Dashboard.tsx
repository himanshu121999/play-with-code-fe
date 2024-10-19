/* eslint-disable @typescript-eslint/no-explicit-any */
import PastClassCard from "../../components/PastClassCard/PastClassCard";
import TodaysClassCard from "../../components/TodaysClassCard/TodaysClassCard";
import { useGetCourseClassesQuery } from "../../services/CourseClassServices";
import { useGetTodaysClassesQuery } from "../../services/TodaysClassServices";

const Dashboard = () => {
  const {
    data: todaysClassesData,
    isLoading,
    isFetching,
  } = useGetTodaysClassesQuery("");

  const {
    data: courseClassesData,
    isLoading: isCourseClassesDataLoading,
    isFetching: isCourseClassesDataFetching,
  } = useGetCourseClassesQuery("");

  console.log(isLoading, isFetching);
  console.log(isCourseClassesDataLoading, isCourseClassesDataFetching);

  return (
    <div className="grid w-full h-full grid-cols-3">
      {/* Assigments */}
      <div className="col-span-2 p-4">
        <div className="flex flex-col h-full gap-2">
          <div className="text-xl font-medium text-slate-600">Assignments</div>

          <div className="flex-1 py-4 text-xl font-medium text-center text-slate-500">
            You have no assignments !
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col h-full gap-4 py-4 overflow-auto bg-gray-100">
        <div className="flex flex-col gap-2 px-4">
          <div className="text-xl font-medium text-slate-600">
            Today's Classes
          </div>

          <div className="flex flex-col gap-2">
            {todaysClassesData?.map((classData: any) => {
              return <TodaysClassCard key={classData?._id} classData={classData} />;
            })}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2 overflow-auto">
          <div className="px-4 text-xl font-medium text-slate-600">
            Recent Classes
          </div>

          <div className="flex-1 space-y-2 overflow-auto">
            {courseClassesData?.map((courseClassData: any) => {
              return <PastClassCard key={courseClassData?._id} courseClassData={courseClassData} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
