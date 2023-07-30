import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CommandsProps {
  commands: Command[];
}

export default function Commands({ commands }: CommandsProps) {
  return (
    <>
      <div className="relative">
        <div className="flex hover:bg-[#ffffff56] justify-between">
          <div>
            <h1 className="text-main">/</h1>
            <h1 className="text-main">Commands</h1>
          </div>
          <div className="text-main">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        <div className="w-[90%] center-x">
          {commands?.map((e, i) => {
            return (
              <div key={i}>
                <h1>{e.name}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
