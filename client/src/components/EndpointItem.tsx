import React, { useState } from "react";
import { serverHostnameStatic } from "./../constants";
import EndpointForm from "./EndpointForm";
import { notifyClipboard } from "./Notifications";

type Props = EndpointProps & {
  endpoint: IEndpoint;
  hostname: string;
  groupID: string;
  submitAction: (
    e: React.FormEvent,
    groupID: string,
    endpoint: IEndpoint
  ) => void;
  deleteLabel: string;
  deleteAction: (groupID: string, _id: string) => void;
};

const Endpoint: React.FC<Props> = ({
  endpoint,
  hostname,
  groupID,
  submitAction,
  deleteLabel,
  deleteAction,
}) => {
  const [toggleUpdateEndpointPanel, setToggleUpdateEndpointPanel] =
    useState<boolean>();

  const toggle = (): void => {
    setToggleUpdateEndpointPanel(!toggleUpdateEndpointPanel);
  };

  const handleLinkClick = () => {
    const url = serverHostnameStatic + hostname + endpoint.path;
    const httpMethod = endpoint.httpMethod.toUpperCase();
    if (httpMethod === "GET") {
      window.location.href = url;
      return;
    }
    let body = "";
    try {
      const obj = JSON.parse(body);
      body = JSON.stringify(obj);
    } catch {
      body = endpoint.requestBody;
    }
    const command = `curl -X ${httpMethod} -H "Content-Type:application/json" '${url}' -d '${body}' | jq`;

    notifyClipboard(command);
  };

  return (
    <div>
      <div className="Card">
        <div className="Card--text">
          <h1 onClick={toggle}>
            {endpoint.path +
              " [" +
              endpoint.httpMethod +
              "] " +
              endpoint.responseCode}
          </h1>
          <span onClick={handleLinkClick}>
            <i>{serverHostnameStatic + hostname}</i>
            <b>{endpoint.path}</b>
          </span>
        </div>
        <div className="Card--button--container">
          <div className="vertical--line" />
          <div className="Card--button">
            <button onClick={toggle} className="Card--button__blue">
              {toggleUpdateEndpointPanel ? "Close" : "Edit"}
            </button>
            <button
              onClick={() => {
                const confirmationText = `Are you sure you want to delete the endpoint: ${endpoint.path} [${endpoint.httpMethod}] ${endpoint.responseCode}?`;
                if (window.confirm(confirmationText) === true) {
                  deleteAction(groupID, endpoint._id);
                }
              }}
              className="Card--button__red"
            >
              {deleteLabel}
            </button>
          </div>
        </div>
      </div>
      {toggleUpdateEndpointPanel ? (
        <EndpointForm
          endpointid={endpoint._id}
          groupid={groupID}
          initialPath={endpoint.path}
          initialHttpMethod={endpoint.httpMethod}
          initialResponseCode={endpoint.responseCode}
          initialRequestBody={endpoint.requestBody}
          initialResponseBody={endpoint.responseBody}
          submitLabel="Update Endpoint"
          submitAction={submitAction}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Endpoint;
