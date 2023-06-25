import React, { useState } from 'react'
import { serverHostnameStatic } from '../constants'
import GroupForm from './GroupForm'

type Props = { 
  submitAction: (e: React.FormEvent, formData: IGroup | any) => void 
}

const GroupAdd: React.FC<Props> = ({ submitAction }) => {
  const [toggleUpdateGroupPanel, setToggleUpdateGroupPanel] = useState<boolean | {}>()

  const toggle = (): void => {
    setToggleUpdateGroupPanel(!toggleUpdateGroupPanel)
  }

  return (
    <div>
      <div className="Card">
        <div className="Card--title">
          <h1>Mock API</h1>
          <span><b>{serverHostnameStatic}</b></span>
        </div>
        <div className="Card--button--container">
          <div className="vertical--line"/>
          <div className="Card--button">
            <button
              onClick={toggle}
              className="Card--button__blue"
            >
              {toggleUpdateGroupPanel ? "Close" : "Create"}
            </button>
          </div>
        </div> 
      </div>
      {toggleUpdateGroupPanel ? (
      <GroupForm
        groupid=""
        initialName=""
        initialHostname=""
        submitLabel="Add Group"
        submitAction={submitAction}
      />
      ) : ""
      }
    </div>
  )
}

export default GroupAdd