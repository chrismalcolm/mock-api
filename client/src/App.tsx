import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { addGroup, deleteGroup, getGroups, updateGroup } from "./API";
import GroupItem from "./components/GroupItem";
import EndpointItem from "./components/EndpointItem";
import GroupAdd from "./components/GroupAdd";
import EndpointAdd from "./components/EndpointAdd";
import {
  addEndpoint,
  deleteEndpoint,
  getAllEndpoints,
  updateEndpoint,
} from "./API";
import {
  notifyError,
  notifySuccess,
  notifyWarn,
} from "./components/Notifications";

const App: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [endpoints, setEndpoints] = useState<IEndpoint[]>([]);

  useEffect(() => {
    fetchGroups();
    fetchEndpoints();
  }, []);

  const fetchGroups = (): void => {
    getGroups()
      .then(({ status, data }: IGroup[] | any) => {
        if (status === 200) {
          setGroups(data.groups);
        } else {
          notifyWarn(data.errorMessage);
        }
      })
      .catch((err: Error) => {
        notifyError(err);
      });
  };

  const fetchEndpoints = (): void => {
    getAllEndpoints()
      .then(({ status, data }: IEndpoint[] | any) => {
        if (status === 200) {
          setEndpoints(data.endpoints);
        } else {
          notifyWarn(data.errorMessage);
        }
      })
      .catch((err: Error) => {
        notifyError(`${err}`);
      });
  };

  const handleSaveGroup = (e: React.FormEvent, formData: IGroup): void => {
    e.preventDefault();
    addGroup(formData)
      .then(({ status, data }) => {
        if (status === 201) {
          notifySuccess(data.message);
          setGroups(data.groups);
        } else {
          notifyWarn(data.errorMessage);
        }
      })
      .catch((err: Error) => {
        notifyError(err);
      });
  };

  const handleUpdateGroupFactory = (
    groupid: string
  ): ((e: React.FormEvent, formData: IGroup | any) => void) => {
    return (e: React.FormEvent, group: IGroup): void => {
      e.preventDefault();
      group._id = groupid;
      updateGroup(group)
        .then(({ status, data }) => {
          if (status === 200) {
            notifySuccess(data.message);
            setGroups(data.groups);
          } else {
            notifyWarn(data.errorMessage);
          }
        })
        .catch((err: Error) => {
          notifyError(err);
        });
    };
  };

  const handleDeleteGroup = (_id: string): void => {
    deleteGroup(_id)
      .then(({ status, data }) => {
        if (status === 200) {
          notifySuccess(data.message);
          setGroups(data.groups);
        } else {
          notifyWarn(data.errorMessage);
        }
      })
      .catch((err: Error) => {
        notifyError(err);
      });
  };

  const handleSaveEndpoint = (
    e: React.FormEvent,
    groupID: string,
    formData: IEndpoint
  ): void => {
    e.preventDefault();
    addEndpoint(groupID, formData)
      .then(({ status, data }) => {
        if (status === 201) {
          notifySuccess(data.message);
          setEndpoints(data.endpoints);
        } else {
          notifyWarn(data.errorMessage);
        }
      })
      .catch((err: Error) => {
        notifyError(err);
      });
  };

  const handleUpdateEndpointFactory = (
    endpointid: string
  ): ((
    e: React.FormEvent,
    groupID: string,
    formData: IEndpoint | any
  ) => void) => {
    return (e: React.FormEvent, groupID: string, endpoint: IEndpoint): void => {
      e.preventDefault();
      endpoint._id = endpointid;
      updateEndpoint(groupID, endpoint)
        .then(({ status, data }) => {
          if (status === 200) {
            notifySuccess(data.message);
            setEndpoints(data.endpoints);
          } else {
            notifyWarn(data.errorMessage);
          }
        })
        .catch((err: Error) => {
          notifyError(err);
        });
    };
  };

  const handleDeleteEndpoint = (groupID: string, _id: string): void => {
    deleteEndpoint(groupID, _id)
      .then(({ status, data }) => {
        if (status === 200) {
          notifySuccess(data.message);
          setEndpoints(data.endpoints);
        } else {
          notifyWarn(data.errorMessage);
        }
      })
      .catch((err: Error) => {
        notifyError(err);
      });
  };

  const renderGroups = () => {
    return (
      <main className="App">
        <h1>Mock API Groups</h1>
        <GroupAdd submitAction={handleSaveGroup} />
        {groups.map((group: IGroup) => (
          <GroupItem
            key={group._id}
            submitLabel="Update Group"
            submitAction={handleUpdateGroupFactory(group._id)}
            deleteLabel="Delete"
            deleteAction={handleDeleteGroup}
            group={group}
          />
        ))}
      </main>
    );
  };

  const renderEndpoints = (group: IGroup) => {
    return (
      <main className="App">
        <h1>Mock API Endpoints</h1>
        <h3
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back to Groups
        </h3>
        <EndpointAdd group={group} saveEndpoint={handleSaveEndpoint} />
        {endpoints
          .filter((endpoint) => endpoint.groupID === group._id)
          .map((endpoint: IEndpoint) => (
            <EndpointItem
              key={endpoint._id}
              hostname={group.hostname}
              groupID={group._id}
              submitAction={handleUpdateEndpointFactory(endpoint._id)}
              deleteLabel="Delete"
              deleteAction={handleDeleteEndpoint}
              endpoint={endpoint}
            />
          ))}
      </main>
    );
  };

  const render = () => {
    return (
      <div className="wrapper">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={renderGroups()} />
            {groups.map((group: IGroup) => (
              <Route path={"/" + group._id} element={renderEndpoints(group)} />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    );
  };

  return render();
};

export default App;
