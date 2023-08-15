import { faPen, faShield, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewRoleElement {
  onClickDelete: () => any;
  name: string;
  color: string;
  onClickEdit: () => any;
}

export default function NewRoleElement({
  onClickDelete,
  name,
  color,
  onClickEdit,
}: NewRoleElement) {
  return (
    <>
      <div className="bg-[#246724a8] rounded-md p-5 flex md:justify-between justify-center flex-col md:flex-row md:gap-0 gap-5">
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
            onClick={onClickDelete}
            icon={faTrash}
            className="border-2 border-sleep p-2 rounded-md bg-[#38383820] cursor-pointer hover:bg-[#42424275] duration-200"
          />
        </div>
      </div>
    </>
  );
}
