import { faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SelectRolesProps {
  data: Role[];
  onSelect: (id: string) => any;
}

export default function SelectRoles({ data, onSelect }: SelectRolesProps) {
  return (
    <>
      <select
        className="outline-none bg-arr p-3 rounded-md"
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        <option value="">Select a role</option>
        {data.map((role, i) => {
          return (
            <option key={i} value={role.id}>
              <h1>{role.name}</h1>
            </option>
          );
        })}
      </select>
    </>
  );
}
