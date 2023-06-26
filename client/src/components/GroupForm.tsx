import React, { useState } from "react";
import { isEqual } from "lodash";

type Props = {
  groupid: string;
  initialName: string;
  initialHostname: string;
  submitLabel: string;
  submitAction: (e: React.FormEvent, formData: IGroup | any) => void;
};

const GroupForm: React.FC<Props> = ({
  groupid,
  initialName,
  initialHostname,
  submitLabel,
  submitAction,
}) => {
  const nameID = `name|${groupid}`;
  const hostnameID = `hostname|${groupid}`;

  const [formData, setFormData] = useState<IGroup | any>({
    _id: groupid,
    name: initialName,
    hostname: initialHostname,
  });

  const equalsCurrent = (): boolean => {
    return isEqual(formData, {
      _id: groupid,
      name: initialName,
      hostname: initialHostname,
    });
  };

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    const field = e.currentTarget.id.substring(
      0,
      e.currentTarget.id.indexOf("|")
    );
    setFormData({
      ...formData,
      [field]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form" onSubmit={(e) => submitAction(e, formData)}>
      <div>
        <div>
          <label htmlFor={nameID}>Name</label>
          <input
            onChange={handleForm}
            type="text"
            id={nameID}
            defaultValue={initialName}
            autoComplete="off"
          />
          <label htmlFor={hostnameID}>Hostname</label>
          <input
            onChange={handleForm}
            type="text"
            id={hostnameID}
            defaultValue={initialHostname}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="Card--button--container">
        <div className="vertical--line-2" />
        <button className="Card--button__yellow" disabled={equalsCurrent()}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default GroupForm;
