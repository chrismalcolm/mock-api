import React from 'react'
//import { ToastBar, Toaster, toast } from 'react-hot-toast'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { HiXCircle } from 'react-icons/hi'
import { FaCopy } from 'react-icons/fa'

/*
const GlobalStyle = {
    
    minWidth: '400px',
    fontFamily: 'monospace',
    fontSize: '16px',
       
}

const LoadingStyle = {
    ...GlobalStyle,
    background: '#ccc',
}

const SuccessStyle = {
    ...GlobalStyle,
    background: '#8eff8e',
}

const ErrorStyle = {
    ...GlobalStyle,
    background: '#ff8e8e',
}

const ClipboardStyle = {
    ...GlobalStyle,
    background: '#8e8e8e',
}

const NoneStyle = {
    ...GlobalStyle,
}

export enum NotificationTypes {
    Loading   = "loading",
    Success   = "success",
    Error     = "error",
    Clipboard = "clipboard",
    None      = "none",
}

export const sendNotification = (type: NotificationTypes, message: string): string => {
    switch (type) {
        case NotificationTypes.Loading: 
            return toast.loading(message, {style: LoadingStyle});
        case NotificationTypes.Success: 
            return toast.success(message, {style: SuccessStyle});
        case NotificationTypes.Error: 
            return toast.error(message, {style: ErrorStyle});
        case NotificationTypes.Clipboard: 
            return toast(message, {style: ClipboardStyle});
        default:
            return toast(message, {style: NoneStyle});
    }  
}
// onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}

export const updateNotification = (id: string, type: NotificationTypes, message: string): string => {
    switch (type) {
        case NotificationTypes.Loading: 
            return toast.loading(message, {id: id, style: LoadingStyle});
        case NotificationTypes.Success: 
            return toast.success(message, {id: id, style: SuccessStyle});
        case NotificationTypes.Error: 
            return toast.error(message, {id: id, style: ErrorStyle});
        case NotificationTypes.Clipboard: 
            return toast(message, {id: id, style: ClipboardStyle});
        default:
            return toast(message, {id: id, style: NoneStyle});
    }  
}

type Props = { }

const Notifications: React.FC<Props> = () => {

    return (
        <Toaster
            position='top-right'
            reverseOrder={false}
            toastOptions={{
            duration: 5000,
            }}
        >
            {(t) => (
            <ToastBar toast={t}>
                {({ icon, message }) => (
                <>
                    {icon}
                    {message}
                    <br/><br/>
                    Dismiss
                </>
                )}
            </ToastBar>
            )}
        </Toaster>
    )
};
*/
const NOTIFICATION_STYLE = {
    background: "#222",
    fontFamily: "monospace",
    fontSize: "20px",
  }

  const NOTIFICATION_THEME = 'dark'

          

export  const notifyClipboard = (message: any) => {

    toast.info((
    <>
    {message}
    <div className="Card--button--container">   
        
          <div className="Card--button">
            <button
                onClick={() => {
                    navigator.clipboard.writeText(message)
                    notifySuccess('Successfully copied curl command to clipboard')
                }}
              className="Card--button__notification"
            >
              <FaCopy/> Copy to Clipboard
            </button>
          </div>
        </div>
      
    </>
    ), {
      position: toast.POSITION.TOP_RIGHT,
      style: NOTIFICATION_STYLE,
      theme: NOTIFICATION_THEME,
    });
  };


  export  const notifyInfo = (message: any) => {

      toast.info((
      <>
        {message}
      </>
      ), {
        position: toast.POSITION.TOP_RIGHT,
        style: NOTIFICATION_STYLE,
        theme: NOTIFICATION_THEME,
      });
    };

  export const notifyWarn = (message: any) => {
      toast.warn((
      <>
        {message}
      </>
      ), {
        position: toast.POSITION.TOP_RIGHT,
        style: NOTIFICATION_STYLE,
        theme: NOTIFICATION_THEME,
      });
    };

  export const notifyError = (message: any) => {
      toast.error((
      <>
        {message}
      </>
      ), {
        position: toast.POSITION.TOP_RIGHT,
        style: NOTIFICATION_STYLE,
        theme: NOTIFICATION_THEME,
      });
    };


  export const notifySuccess = (message: any) => {
      toast.success((
      <>
        {message}
      </>
      ), {
        position: toast.POSITION.TOP_RIGHT,
        style: NOTIFICATION_STYLE,
        theme: NOTIFICATION_THEME,
      });
    };


//export default Notifications;

/*
onClick={() => toast.dismiss(t.id)}>
{t.type !== 'loading' && (
                    <button onClick={() => toast.dismiss(t.id)}>
                        <HiX />
                    </button>
                    )}
*/