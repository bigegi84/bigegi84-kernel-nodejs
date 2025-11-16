import { readFileSync, writeFileSync } from "fs";
import { State } from "./State.js";
export const Action = {
  Directory: {
    Current: () => {
      const split = State.Path.split("/");
      let result = State.Storage;
      split.forEach((it) => {
        if (result[it]) result = result[it];
      });
      return result;
    },
  },
  Storage: {
    Get: () => {
      const raw = readFileSync(State.StoragePath);
      const data = JSON.parse(raw);
      return data;
    },
    Save: () => {
      const jsonString = JSON.stringify(State.Storage, null, 2);
      writeFileSync(State.StoragePath, jsonString);
    },
  },
};
