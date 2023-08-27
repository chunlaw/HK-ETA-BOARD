import { Eta } from "hk-bus-eta";

export const getEtaString = (eta: Eta | null) => {
  if (!eta || !eta.eta) {
    return "";
  } else {
    const waitTime = Math.round(
      (new Date(eta.eta).getTime() - new Date().getTime()) / 60 / 1000,
    );
    if (!Number.isInteger(waitTime)) {
      return eta.remark.zh;
    }

    return eta.eta;
  }
};

export const getWaitTime = (eta: Eta | null, ts: Date) => {
  if (!eta || !eta.eta) {
    return "";
  } else {
    const waitTime = Math.round(
      (new Date(eta.eta).getTime() - ts.getTime()) / 60 / 1000,
    );
    if (!Number.isInteger(waitTime)) {
      return "";
    }
    return waitTime;
  }
};
