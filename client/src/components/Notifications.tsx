import React from "react";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const NOTIFICATION_STYLE = {
  background: "#222",
  fontFamily: "monospace",
  fontSize: "20px",
};

const NOTIFICATION_THEME = "dark";

export const notifyClipboard = (message: any) => {
  toast.info(
    <>
      {message}
      <div className="Card--button--container">
        <div className="Card--button">
          <button
            onClick={() => {
              navigator.clipboard.writeText(message);
              notifySuccess("Successfully copied curl command to clipboard");
            }}
            className="Card--button__notification"
          >
            <FaCopy /> Copy to Clipboard
          </button>
        </div>
      </div>
    </>,
    {
      position: toast.POSITION.TOP_RIGHT,
      style: NOTIFICATION_STYLE,
      theme: NOTIFICATION_THEME,
    }
  );
};

export const notifyInfo = (message: any) => {
  toast.info(<>{message}</>, {
    position: toast.POSITION.TOP_RIGHT,
    style: NOTIFICATION_STYLE,
    theme: NOTIFICATION_THEME,
  });
};

export const notifyWarn = (message: any) => {
  toast.warn(<>{message}</>, {
    position: toast.POSITION.TOP_RIGHT,
    style: NOTIFICATION_STYLE,
    theme: NOTIFICATION_THEME,
  });
};

export const notifyError = (message: any) => {
  toast.error(<>{message}</>, {
    position: toast.POSITION.TOP_RIGHT,
    style: NOTIFICATION_STYLE,
    theme: NOTIFICATION_THEME,
  });
};

export const notifySuccess = (message: any) => {
  toast.success(<>{message}</>, {
    position: toast.POSITION.TOP_RIGHT,
    style: NOTIFICATION_STYLE,
    theme: NOTIFICATION_THEME,
  });
};
