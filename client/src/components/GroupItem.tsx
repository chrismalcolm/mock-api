import React, { useState } from "react";
import { serverHostnameStatic } from "./../constants";
import GroupForm from "./GroupForm";

type Props = GroupProps & {
  submitLabel: string;
  submitAction: (e: React.FormEvent, group: IGroup) => void;
  deleteLabel: string;
  deleteAction: (_id: string) => void;
};

const Group: React.FC<Props> = ({
  group,
  submitLabel,
  submitAction,
  deleteLabel,
  deleteAction,
}) => {
  const [toggleUpdateGroupPanel, setToggleUpdateGroupPanel] =
    useState<boolean>();

  const toggle = (): void => {
    setToggleUpdateGroupPanel(!toggleUpdateGroupPanel);
  };

  return (
    <div>
      <div className="Card">
        <div className="Card--text">
          <h1 onClick={toggle}>{group.name}</h1>
          <span
            onClick={() => {
              window.location.href = "/" + group._id;
            }}
          >
            <i>{serverHostnameStatic}</i>
            <b>{group.hostname}</b>
          </span>
        </div>
        <div className="Card--button--container">
          <div className="vertical--line" />
          <div className="Card--button">
            <button onClick={toggle} className="Card--button__blue">
              {toggleUpdateGroupPanel ? "Close" : "Rename"}
            </button>
          </div>
          <div className="Card--button">
            <button
              onClick={() => {
                const confirmationText = `Are you sure you want to delete the group: ${group.name}?`;
                if (window.confirm(confirmationText) === true) {
                  deleteAction(group._id);
                }
              }}
              className="Card--button__red"
            >
              {deleteLabel}
            </button>
          </div>
        </div>
      </div>

      {toggleUpdateGroupPanel ? (
        <GroupForm
          groupid={group._id}
          initialName={group.name}
          initialHostname={group.hostname}
          submitLabel={submitLabel}
          submitAction={submitAction}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Group;
