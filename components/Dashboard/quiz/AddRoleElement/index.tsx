import { useState } from "react";
import Input from "../input";
import QuizConfigSwitch from "../Switch";
import SecondaryButton from "@/components/utils/secondary-button";
import MainBtn from "@/components/utils/main-btn";
import SelectRoles from "../SelectRoles";

interface AddRoleElement {
  onClickOk: (role: Roles) => any;
  onClickCancel: () => any;
  roles: Role[];
}

export default function AddRoleElement({
  onClickCancel,
  onClickOk,
  roles,
}: AddRoleElement) {
  const [id, setId] = useState<string>();
  const [gamesPerUser, setGamePerUser] = useState<number>(15);
  const [playQzgame, setPlayQuizGame] = useState<boolean>(true);
  return (
    <>
      <div className="full-page-shadow" onClick={onClickCancel}></div>
      <div className="border-[1px] border-main pt-7 ps-12 pr-12 bg-black z-[10000] absolute top-[50%] left-[50%] w-[340px] sm:w-[450px] rounded-[20px] h-[600px] translate-x-[-50%] translate-y-[-50%] flex flex-col pb-10">
        <div>
          <h1>Add New Role</h1>
          <p className="mt-3">
            Utilize Discord roles to assign permissions within quiz games.
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <SelectRoles data={roles} onSelect={(id) => setId(id)} />
          <Input
            className="w-[75px]"
            type="number"
            name="games can creates"
            value={`${gamesPerUser}`}
            onChange={(e) => setGamePerUser(+e.target.value || 0)}
            max={15}
            min={0}
          />
          <QuizConfigSwitch
            name="play quiz game"
            enable={playQzgame}
            onChange={() => setPlayQuizGame(!playQzgame)}
          />
        </div>
        <div className="flex justify-center gap-5 mt-5 scale-75">
          <SecondaryButton onClick={onClickCancel}>Cancel</SecondaryButton>
          <MainBtn
            disabled={!id || typeof gamesPerUser !== "number" ? true : false}
            onClick={() =>
              onClickOk({ id: id as string, gamesPerUser, playQzgame })
            }
          >
            Ok
          </MainBtn>
        </div>
      </div>
    </>
  );
}
