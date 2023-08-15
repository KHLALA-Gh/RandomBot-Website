import { faPen, faShield, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ArrayElementProps {
  name: string;
  onClickEdit: () => any;
  onClickDelete: () => any;
  color: string;
}

export default function ArrayElementRole({
  name,
  onClickDelete,
  onClickEdit,
  color,
}: ArrayElementProps) {
  return (
    <>
      <div className="bg-arr rounded-md p-5 flex md:justify-between justify-center flex-col md:flex-row md:gap-0 gap-5">
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
            onClick={onClickEdit}
            icon={faPen}
            className="border-2 border-[#1a811b] p-2 rounded-md bg-[#1a811c20] cursor-pointer hover:bg-[#1a811c58] duration-200"
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="border-2 border-[#811a1a] p-2 rounded-md bg-[#811a1a20] cursor-pointer hover:bg-[#811a1a58] duration-200"
            onClick={onClickDelete}
          />
        </div>
      </div>
    </>
  );
}
