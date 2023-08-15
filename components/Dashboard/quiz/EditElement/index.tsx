import { faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../input";
import SecondaryButton from "@/components/utils/secondary-button";
import MainBtn from "@/components/utils/main-btn";
import QuizEnable from "../Enable";
import QuizConfigSwitch from "../Switch";

interface EditRoleElementProps {
  name: string;
  color: string;
  description?: string;
  onClickOk: () => any;
  onClickCancel: () => any;
  role: Roles;
  onChangegamesPerUser: (games: number) => any;
  onChangeEnable: () => any;
}

export default function EditRoleElement({
  name,
  color,
  description,
  onClickOk,
  onClickCancel,
  role,
  onChangegamesPerUser,
  onChangeEnable,
}: EditRoleElementProps) {
  return (
    <>
      <div className="full-page-shadow" onClick={onClickOk}></div>
      <div className="border-[1px] border-main pt-7 ps-12 pr-12 bg-black z-[10000] absolute top-[50%] left-[50%] w-[340px] sm:w-[450px] rounded-[20px] h-[600px] translate-x-[-50%] translate-y-[-50%] flex flex-col pb-10">
        <div className="pb-5 border-b-2 border-b-white">
          <div className="flex gap-5 items-center">
            <FontAwesomeIcon
              icon={faShield}
              className="text-[30px]"
              style={{
                color: `#${color}`,
              }}
            />
            <h1 className="text-[36px]">{name}</h1>
          </div>
          <p className="text-sleep text-[16px] mt-3">{description}</p>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <Input
            max={15}
            min={0}
            value={`${role.gamesPerUser}`}
            onChange={(e) => onChangegamesPerUser(+e.target.value || 0)}
            name="games can creates"
            className="w-[75px]"
            type="number"
          />
          <QuizConfigSwitch
            name="play quiz game"
            enable={role.playQzgame as boolean}
            onChange={onChangeEnable}
          />
        </div>
        <div className="flex justify-center gap-5 mt-5 scale-75">
          <SecondaryButton onClick={onClickCancel}>Cancel</SecondaryButton>
          <MainBtn onClick={onClickOk}>Ok</MainBtn>
        </div>
      </div>
    </>
  );
}
