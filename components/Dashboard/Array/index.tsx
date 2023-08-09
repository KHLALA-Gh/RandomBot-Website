import MainBtn from "@/components/utils/main-btn";
import SecondaryButton from "@/components/utils/secondary-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface Props {
  name: string;
  url: string;
  onClickAdd: () => any;
}

export default function ArrayData({ name, url, onClickAdd }: Props) {
  return (
    <>
      <div className="bg-[#1F1F1F] flex ps-10 pr-10 pt-4 pb-4 rounded-md text-[18px] justify-between items-center">
        <h1>{name}</h1>
        <div
          className="rounded-md bg-[#5B5B5B] w-[40px] h-[40px] relative cursor-pointer"
          onClick={onClickAdd}
        >
          <FontAwesomeIcon icon={faPlus} className="center-xy" />
        </div>
      </div>
    </>
  );
}
