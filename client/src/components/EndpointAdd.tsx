import React, { useState } from 'react'
import { serverHostnameStatic } from "../constants"
import EndpointForm from './EndpointForm'

type Props = { 
  group: IGroup,
  saveEndpoint: (e: React.FormEvent, groupID: string, formData: IEndpoint | any) => void 
}

const EndpointAdd: React.FC<Props> = ({ group, saveEndpoint }) => {
  const [toggleUpdateGroupPanel, setToggleUpdateGroupPanel] = useState<boolean | {}>()

  const toggle = (): void => {
    setToggleUpdateGroupPanel(!toggleUpdateGroupPanel)
  }
  return (
    <div>
      <div className="Card">
        <div className="Card--title">
          <h1>{group.name}</h1>
          <span><i>{serverHostnameStatic}</i><b>{group.hostname}</b></span>
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
      <EndpointForm
        endpointid=""
        groupid={group._id}
        initialPath=""
        initialHttpMethod="GET"
        initialResponseCode="200"
        initialRequestBody=""
        initialResponseBody=""
        submitLabel="Add Endpoint"
        submitAction={saveEndpoint}
      />
      ) : ""
      }
    </div>
  )
}

export default EndpointAdd;