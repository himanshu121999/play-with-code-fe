import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

type Props = {
  courseClassData: {
    topic: string;
    batch: string;
    mentor: string;
    date: string;
    imageUrl: string;
    notesPdfUrl: string;
    classLink: string;
    _id: string;
  };
  isPlaying?: boolean;
};

const PastClassCard = ({
  courseClassData: {
    topic,
    batch,
    mentor,
    date,
    imageUrl,
    notesPdfUrl,
    classLink,
  },

  isPlaying = false,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={`px-4 ${isPlaying ? "bg-[#e4f0f5] shadow-md" : "transparent"}`}>
      <div className={`flex gap-2 p-3 border rounded-md ${isPlaying ? "bg-transparent" : "bg-white"}`}>
        <div className="size-[80px]">
          <img src={imageUrl} alt="class-banner" className="size-full" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex-1" >
              <div className="text-lg font-medium text-[#005f73]">{topic}</div>

              <div className="text-xs font-medium text-slate-600">
                {" "}
                {batch} | {mentor}{" "}
              </div>
            </div>

            <div className="text-lg font-semibold text-slate-700">
              {format(date, "dd MMM yy")}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {notesPdfUrl === "NA" ? null : (
              <a href={notesPdfUrl} target="__blank">
                <button className="px-4 py-1 font-semibold border rounded-md text-[#005f73] border-[#005f73]">
                  Notes
                </button>
              </a>
            )}
            <button
              onClick={() =>
                navigate(
                  `/view-class?class-link=${classLink}&topic-name=${topic}`
                )
              }
              className="px-4 py-1 font-semibold text-white rounded-md bg-[#005f73]"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastClassCard;
