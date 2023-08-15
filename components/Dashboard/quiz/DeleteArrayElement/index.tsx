import { faRefresh, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DeleteArrayElementProps {
  name: string;
  onClickReset: () => any;
  color: string;
}
export default function DeleteArrayElementRole({
  name,
  onClickReset,
  color,
}: DeleteArrayElementProps) {
  return (
    <>
      <div className="bg-[#ff161697] rounded-md p-5 flex md:justify-between justify-center flex-col md:flex-row md:gap-0 gap-5">
        <div className="flex gap-5 items-center">
          <FontAwesomeIcon
            icon={faShield}
            style={{
              color: `#${color}`,
            }}
          />
          <h1>{name}</h1>
        </div>
        <div className="flex gap-3">
          <FontAwesomeIcon
            onClick={onClickReset}
            icon={faRefresh}
            className="border-2 border-sleep p-2 rounded-md bg-[#38383820] cursor-pointer hover:bg-[#42424275] duration-200"
          />
        </div>
      </div>
    </>
  );
}
