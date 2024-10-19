type Props = {
  classData: {
    topic: string;
    batch: string;
    mentor: string;
    time: string;
    zoomLink: string;
  };
};

const TodaysClassCard = ({
  classData: { topic, batch, mentor, time, zoomLink },
}: Props) => {
  return (
    <div className="p-3 bg-white border rounded-md">
      <div className="flex justify-between">
        <div>
          <div className="text-lg font-medium text-[#005f73]">{topic}</div>

          <div className="text-xs font-medium text-slate-600">
            {" "}
            {batch} | {mentor}{" "}
          </div>
        </div>

        <div className="text-lg font-semibold text-slate-700">{time}</div>
      </div>

      <div className="flex justify-end">
        <a href={zoomLink} target="__blank">
          <button className="px-4 py-1 font-semibold text-white rounded-md bg-[#005f73]">
            Join
          </button>
        </a>
      </div>
    </div>
  );
};

export default TodaysClassCard;
