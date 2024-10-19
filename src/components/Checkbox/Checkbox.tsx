import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = ({ checked, onChange }: Props) => {
  const [checkedState, setChecked] = useState(checked);

  return (
    <div
      onClick={() => {
        onChange(!checkedState);
        setChecked((prev) => !prev);
      }}
      className={`size-[25px] border  rounded-md text-white flex justify-center items-center cursor-pointer ${
        checkedState
          ? "bg-[#ee9b00] border-[#ee9b00]"
          : "bg-white border-gray-300"
      }`}
    >
      {checkedState && <IconCheck size={20} stroke={2} />}
    </div>
  );
};

export default Checkbox;
