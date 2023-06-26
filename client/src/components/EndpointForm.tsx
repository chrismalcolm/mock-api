import React, { useState } from "react";
import { HTTPMethods } from "../constants";
import { ResponseCodes } from "../constants";
import { isEqual } from "lodash";

type Props = {
  endpointid: string;
  groupid: string;
  initialPath: string;
  initialHttpMethod: string;
  initialResponseCode: string;
  initialRequestBody: string;
  initialResponseBody: string;
  submitLabel: string;
  submitAction: (
    e: React.FormEvent,
    groupID: string,
    formData: IEndpoint | any
  ) => void;
};

const EndpointForm: React.FC<Props> = ({
  endpointid,
  groupid,
  initialPath,
  submitLabel,
  initialHttpMethod,
  initialResponseCode,
  initialRequestBody,
  initialResponseBody,
  submitAction,
}) => {
  const id = `formID|${groupid}:${endpointid}`;
  const pathID = `path|${groupid}:${endpointid}`;
  const httpMethodID = `httpMethod|${groupid}:${endpointid}`;
  const responseCodeID = `responseCode|${groupid}:${endpointid}`;
  const requestBodyID = `requestBody|${groupid}:${endpointid}`;
  const responseBodyID = `responseBody|${groupid}:${endpointid}`;

  const [formData, setFormData] = useState<IEndpoint | any>({
    _id: endpointid,
    path: initialPath,
    httpMethod: initialHttpMethod,
    responseCode: initialResponseCode,
    requestBody: initialRequestBody,
    responseBody: initialResponseBody,
  });

  const equalsCurrent = (): boolean => {
    return isEqual(formData, {
      _id: endpointid,
      path: initialPath,
      httpMethod: initialHttpMethod,
      responseCode: initialResponseCode,
      requestBody: initialRequestBody,
      responseBody: initialResponseBody,
    });
  };

  const handleFormInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const field = e.currentTarget.id.substring(
      0,
      e.currentTarget.id.indexOf("|")
    );
    setFormData({
      ...formData,
      [field]: e.currentTarget.value,
    });
  };

  const handleSelectForm = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const field = e.currentTarget.id.substring(
      0,
      e.currentTarget.id.indexOf("|")
    );
    setFormData({
      ...formData,
      [field]: e.currentTarget.value,
    });
  };

  const hideRequestBodyTextArea = (): boolean => {
    const select = document.getElementById(httpMethodID) as HTMLSelectElement;
    if (select === null) {
      return initialHttpMethod === "GET";
    }
    return select.value.toUpperCase() === "GET";
  };

  const handleTextAreaFormFactory = (
    id: string
  ): ((e: React.ChangeEvent<HTMLTextAreaElement>) => void) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const field = e.currentTarget.id.substring(
        0,
        e.currentTarget.id.indexOf("|")
      );
      setFormData({
        ...formData,
        [field]: e.currentTarget.value,
      });
      const textArea = document.getElementById(id) as HTMLTextAreaElement;
      setTextAreaHeight(textArea);
    };
  };

  const setTextAreaHeight = (textArea: HTMLTextAreaElement) => {
    const lineCount = Math.max(textArea.value.split(/\r\n|\r|\n/).length, 1);
    textArea.style.height = "";
    textArea.style.height = `${45 + lineCount * 15}px`;
  };

  const inputAreaOnKeyDownFactory = (id: string): ((event: any) => void) => {
    return (event: any): void => {
      const textArea = document.getElementById(id) as HTMLTextAreaElement;
      // 'event.keyCode' is the key code as a number: 'Tab' = 9
      if (event.keyCode === 9) {
        // Prevent the default action to not lose focus when tab
        event.preventDefault();

        const { selectionStart, selectionEnd } = event.target;

        textArea.value =
          textArea.value.substring(0, selectionStart) +
          "    " +
          textArea.value.substring(selectionEnd);

        textArea.selectionStart = selectionStart + 4;
        textArea.selectionEnd = selectionStart + 4;
      }
    };
  };

  const prettyTextArea = (id: string): void => {
    const textArea = document.getElementById(id) as HTMLTextAreaElement;
    textArea.value = prettyJSON(textArea.value);
    setTextAreaHeight(textArea);
  };

  const compactTextArea = (id: string): void => {
    const textArea = document.getElementById(id) as HTMLTextAreaElement;
    textArea.value = compactJSON(textArea.value);
    setTextAreaHeight(textArea);
  };

  const compactJSON = (input: string): string => {
    try {
      const obj = JSON.parse(input);
      return JSON.stringify(obj);
    } catch {
      return input;
    }
  };

  const prettyJSON = (input: string): string => {
    try {
      const obj = JSON.parse(input);
      return JSON.stringify(obj, null, 4);
    } catch {
      return input;
    }
  };

  return (
    <form
      id={id}
      className="Form"
      onSubmit={(e) => submitAction(e, groupid, formData)}
    >
      <div>
        <div>
          <label htmlFor={pathID}>Path</label>
          <input
            onChange={handleFormInput}
            type="text"
            id={pathID}
            defaultValue={initialPath}
            autoComplete="off"
          />
          <label htmlFor={httpMethodID}>HTTP Method</label>
          <select onChange={handleSelectForm} id={httpMethodID}>
            {HTTPMethods.map((httpMethod: string) => {
              if (initialHttpMethod === httpMethod) {
                return (
                  <option value={httpMethod} selected>
                    {httpMethod}
                  </option>
                );
              }
              return <option value={httpMethod}>{httpMethod}</option>;
            })}
          </select>
          <label htmlFor={responseCodeID}>Response Code</label>
          <select onChange={handleSelectForm} id={responseCodeID}>
            {ResponseCodes.map((ResponseCode: string) => {
              const code = ResponseCode.substr(0, 3);
              if (initialResponseCode === code) {
                return (
                  <option value={code} selected>
                    {ResponseCode}
                  </option>
                );
              }
              return <option value={code}>{ResponseCode}</option>;
            })}
          </select>
          <div hidden={hideRequestBodyTextArea()}>
            <label htmlFor={requestBodyID}>
              Request Body |{" "}
              <span
                className="Card--tab"
                onClick={() => {
                  prettyTextArea(requestBodyID);
                }}
              >
                <b>Pretty</b>
              </span>
              <span> | </span>
              <span
                className="Card--tab"
                onClick={() => {
                  compactTextArea(requestBodyID);
                }}
              >
                <b>Compact</b>
              </span>
            </label>
            <textarea
              id={requestBodyID}
              defaultValue={initialRequestBody}
              onKeyDown={inputAreaOnKeyDownFactory(requestBodyID)}
              onChange={handleTextAreaFormFactory(requestBodyID)}
            />
          </div>
          <div>
            <label htmlFor={responseBodyID}>
              Response Body |{" "}
              <span
                className="Card--tab"
                onClick={() => {
                  prettyTextArea(responseBodyID);
                }}
              >
                <b>Pretty</b>
              </span>
              <span> | </span>
              <span
                className="Card--tab"
                onClick={() => {
                  compactTextArea(responseBodyID);
                }}
              >
                <b>Compact</b>
              </span>
            </label>
            <textarea
              id={responseBodyID}
              defaultValue={initialResponseBody}
              onKeyDown={inputAreaOnKeyDownFactory(responseBodyID)}
              onChange={handleTextAreaFormFactory(responseBodyID)}
            />
          </div>
        </div>
      </div>
      <div className="Card--button--container">
        <div className="vertical--line-3" />
        <button className="Card--button__yellow" disabled={equalsCurrent()}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default EndpointForm;
