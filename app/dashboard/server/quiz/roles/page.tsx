"use client";
import { useContext, useEffect, useState } from "react";
import { DashBoardData, DashboardContext } from "../../layout";
import ArrayElementRole from "@/components/Dashboard/quiz/ArrayElement";
import EditRoleElement from "@/components/Dashboard/quiz/EditElement";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Save from "@/components/Dashboard/Save";
import DeleteArrayElementRole from "@/components/Dashboard/quiz/DeleteArrayElement";
import ArrayData from "@/components/Dashboard/Array";
import AddRoleElement from "@/components/Dashboard/quiz/AddRoleElement";
import NewRoleElement from "@/components/Dashboard/quiz/NewRoleElement";

export default function Page() {
  const { data, error, isLoading, update } = useContext(
    DashboardContext
  ) as DashBoardData;
  const {
    mutate,
    isLoading: postLoading,
    data: postData,
  } = useMutation({
    mutationKey: ["roles", data?.id],
    mutationFn: async () => {
      return (
        await axios.post(`/api/configs/quiz/${data.id}/roles`, {
          config,
        })
      ).data as Roles[];
    },
  });
  const [currentConfig, setCurrentConfig] = useState<Roles[]>();
  const [config, setConfig] = useState<Roles[]>();
  const [editRole, setEditRole] = useState<Roles>();
  const [editRoleData, setEditRoleData] = useState<Role>();
  const [showEditElement, setShowEditElement] = useState<boolean>();
  const [isChanged, setIsChanged] = useState<boolean>();
  const [showAddRole, setShowAddRole] = useState<boolean>();
  const compare = () => {
    if (!config || !currentConfig) return;
    if (config.length !== currentConfig.length) return setIsChanged(true);
    for (let i = 0; i < config?.length; i++) {
      let isFound = false;
      for (let j = 0; j < currentConfig.length; j++) {
        if (config[i].id === currentConfig[j].id) {
          isFound = true;
          if (config[i].gamesPerUser !== currentConfig[j].gamesPerUser)
            return setIsChanged(true);
          if (config[i].playQzgame !== currentConfig[j].playQzgame)
            return setIsChanged(true);
        }
      }
      if (!isFound) {
        return setIsChanged(true);
      }
    }

    return setIsChanged(false);
  };
  useEffect(() => {
    setTimeout(() => {
      if (!data) return;
      if (isLoading === false) {
        const validRoles = data?.quiz?.roles?.filter((role) => {
          let isValid = false;
          for (let i = 0; i < data.roles.length; i++) {
            if (data.roles[i].id === role.id) {
              isValid = true;
            }
          }
          if (!isValid) return false;
          return true;
        });
        setCurrentConfig(validRoles);
        setConfig(validRoles);
      }
    }, 50);
  }, [data]);
  useEffect(() => {
    compare();
  }, [config]);
  useEffect(() => {
    if (!postData) return;
    if (postLoading === false) {
      update({
        ...data,
        quiz: {
          ...data.quiz,
          roles: postData as Roles[],
        },
      });
    }
  }, [postData]);
  return (
    <>
      <div className="p-5 flex flex-col">
        <div className="border-b-2 border-b-white pb-5">
          <h1 className="text-2xl">Roles</h1>
          <p className="mt-3 text-sm">
            Utilize Discord roles to assign permissions within quiz games.
          </p>
        </div>
        <div className="mt-5 flex-grow ps-7 pb-7 overflow-y-scroll flex flex-col gap-3 op">
          {currentConfig?.map((e, i) => {
            if (!data.roles.filter((role) => role.id === e.id)[0]) return;
            const role = data.roles.filter((role) => role.id === e.id)[0];
            let isDeleted = true;
            config?.map((ele) => {
              if (ele.id === e.id) {
                isDeleted = false;
              }
            });
            if (isDeleted)
              return (
                <DeleteArrayElementRole
                  key={i}
                  name={role.name}
                  color={role.color.toString(16)}
                  onClickReset={() => {
                    if (!config) return;
                    setConfig([...config, e]);
                  }}
                />
              );
            return (
              <ArrayElementRole
                name={role.name}
                onClickDelete={() => {
                  setConfig(config?.filter((r) => r.id !== e.id));
                }}
                onClickEdit={() => {
                  setEditRole(
                    (config as Roles[]).filter((r) => r.id === e.id)[0]
                  );
                  setEditRoleData(role);
                  setShowEditElement(true);
                }}
                key={i}
                color={role.color.toString(16)}
              />
            );
          })}
          {config?.length !== currentConfig?.length && (
            <>
              {config
                ?.filter((role) => {
                  let isInCr = false;
                  currentConfig?.map((cr) => {
                    if (cr.id === role.id) {
                      isInCr = true;
                    }
                  });
                  if (isInCr) return false;
                  return true;
                })
                .map((role, i) => {
                  let r = data.roles.filter((e) => e.id === role.id)[0];
                  return (
                    <NewRoleElement
                      key={i}
                      name={r?.name}
                      color={r?.color.toString(16)}
                      onClickDelete={() => {
                        if (!config) return;
                        setConfig(config.filter((r) => r.id !== role.id));
                      }}
                      onClickEdit={() => {
                        setEditRole(role);
                        setEditRoleData(r);
                        setShowEditElement(true);
                      }}
                    />
                  );
                })}
            </>
          )}
          <ArrayData
            name="Add a role"
            onClickAdd={() => setShowAddRole(true)}
          />
        </div>
      </div>
      {showEditElement && (
        <EditRoleElement
          name={editRoleData?.name as string}
          description=""
          color={editRoleData?.color.toString(16) as string}
          onClickOk={() => {
            if (!config || !editRole) return;
            setConfig([
              ...config?.filter((role) => role.id !== editRole?.id),
              editRole,
            ]);
            setShowEditElement(false);
          }}
          onChangegamesPerUser={(games) => {
            if (!config || !editRole) return;
            setEditRole({ ...editRole, gamesPerUser: games });
          }}
          onClickCancel={() => {
            setShowEditElement(false);
          }}
          role={editRole as Roles}
          onChangeEnable={() => {
            if (!editRole) return;
            setEditRole({ ...editRole, playQzgame: !editRole?.playQzgame });
          }}
        />
      )}
      {showAddRole && isLoading === false && data && (
        <AddRoleElement
          onClickCancel={() => setShowAddRole(false)}
          onClickOk={(role) => {
            if (!config) return;
            setConfig([...config, role]);
            setShowAddRole(false);
          }}
          roles={data?.roles?.filter((role) => {
            if (!config) return;
            for (let i = 0; i < config?.length; i++) {
              if (config[i].id === role.id) return false;
            }
            return true;
          })}
        />
      )}
      <Save
        reset={() => setConfig(currentConfig)}
        save={mutate}
        show={isChanged as boolean}
        isLoading={postLoading}
      />
    </>
  );
}
