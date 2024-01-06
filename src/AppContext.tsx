import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { EtaDb, fetchEtas, fetchEtaDb } from "hk-bus-eta";
import { useNavigate, useParams } from "react-router-dom";
import { EtaEntry } from "./data.t";

interface AppContextState {
  db: EtaDb;
  data: EtaEntry[];
}

interface AppContextValue extends AppContextState {
  routeId: string;
  stopSeq: string;
  setRouteId: (routeId: string) => void;
  setStopSeq: (stopSeq: number | null) => void;
}

const AppContext = React.createContext({} as AppContextValue);

interface AppContextProviderProps {
  children: ReactNode;
}

export type AppParams = {
  routeId: string;
  stopSeq?: string;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, setState] = useState<AppContextState>(DEFAULT_STATE);
  const { routeId, stopSeq } = useParams<AppParams>();
  const navigate = useNavigate();

  const setRouteId = useCallback((routeId: string) => {
    navigate(`/${encodeURI(routeId)}`);
    setState((prev) => ({
      ...prev,
      data: [],
    }));
  }, []);

  const setStopSeq = useCallback(
    (stopSeq: number | null) => {
      navigate(`/${encodeURI(routeId ?? "")}/${encodeURI(`${stopSeq ?? ""}`)}`);
      setState((prev) => ({
        ...prev,
        data: [],
      }));
    },
    [routeId],
  );

  useEffect(() => {
    if (state.db.holidays.length === 0) {
      fetchEtaDb().then((db) => {
        setState((prev) => ({
          ...prev,
          db,
        }));
      });
    }
  }, [state.db]);

  useEffect(() => {
    const fetchData = () => {
      if (state.db.holidays.length === 0) {
        return;
      }
      if (routeId && stopSeq !== undefined) {
        fetchEtas({
          ...state.db.routeList[routeId],
          stopList: state.db.stopList,
          seq: parseInt(stopSeq, 10),
          language: "zh",
        }).then((etas) => {
          setState((prev) => ({
            ...prev,
            data: [...prev.data, { etas, ts: new Date() }],
          }));
        });
      }
    };

    const timer = setInterval(() => fetchData(), 30000);
    fetchData();

    return () => {
      clearInterval(timer);
    };
  }, [state.db, routeId, stopSeq]);

  if (state.db.holidays.length === 0) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        routeId: routeId ?? "",
        stopSeq: stopSeq ?? "",
        setRouteId,
        setStopSeq,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

const DEFAULT_STATE: AppContextState = {
  db: {
    stopList: {},
    holidays: [],
    routeList: {},
    stopMap: {},
    serviceDayMap: {},
  },
  data: [],
};
