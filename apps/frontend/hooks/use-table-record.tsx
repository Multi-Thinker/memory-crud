import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import config from "../config";
import { fetch } from "../utils/fetch";
import type User from "../app/types/user-type";

interface Response {
  loading?: boolean;
  data: User[];
  status: number;
  deleteRecord?: (id: string) => unknown;
  insertRecord?: ({
    username,
    firstName,
    lastName,
  }: {
    username: string;
    firstName: string;
    lastName: string;
  }) => unknown;
  updateRecord?: ({
    id,
    firstName,
    lastName,
  }: {
    id: string;
    firstName: string;
    lastName: string;
  }) => unknown;
  fetchRecord?: (id: string) => unknown;
}

export function useTableRecords(): Response {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<Response>({
    data: [],
    status: -1,
  });

  const fetchRecord = (id: string): Promise<AxiosResponse> => {
    return fetch(`${config.backend.url}/users/${id}`, { method: "GET" });
  };

  const deleteRecord = (id: string): Promise<AxiosResponse> => {
    return fetch(`${config.backend.url}/users/${id}`, { method: "DELETE" });
  };

  const insertRecord = ({
    username,
    firstName,
    lastName,
  }: {
    username: string;
    firstName: string;
    lastName: string;
  }): Promise<AxiosResponse> => {
    return fetch(`${config.backend.url}/users`, {
      method: "POST",
      data: {
        username,
        firstName,
        lastName,
      },
    });
  };

  const updateRecord = ({
    id,
    firstName,
    lastName,
  }: {
    id: string;
    firstName: string;
    lastName: string;
  }): Promise<AxiosResponse> => {
    return fetch(`${config.backend.url}/users/${id}`, {
      method: "PUT",
      data: { id, firstName, lastName },
    });
  };

  useEffect(() => {
    fetch(`${config.backend.url}/users`, {
      method: "GET",
    })
      .then(({ data, status }) => {
        setResponse({ data, status, loading: true });
      })
      .catch((error) => {
        throw Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    ...response,
    loading,
    deleteRecord,
    insertRecord,
    updateRecord,
    fetchRecord,
  };
}
