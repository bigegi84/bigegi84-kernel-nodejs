import { Action } from "./Action.js";
import { State } from "./State.js";

export const UserSpace = {
  cat: (args) => {
    const dir = Action.Directory.Current();
    if (!dir[args[0]] || typeof dir[args[0]] != "string") {
      console.log(`${args[0]} is not a file.`);
    }
    console.log(dir[args[0]]);
  },
  cd: (args) => {
    const dir = Action.Directory.Current();
    if (!dir[args[0]] || typeof dir[args[0]] != "object") {
      console.log(`${args[0]} is not a directory.`);
    }
    State.Path += `${args[0]}/`;
  },
  exec: (args) => {
    const dir = Action.Directory.Current();
    if (!dir[args[0]] || typeof dir[args[0]] != "string") {
      console.log(`${args[0]} is not a directory.`);
    }
    eval(dir[args[0]]);
  },
  ls: () => {
    const dir = Action.Directory.Current();
    for (let key in dir) {
      console.log(key);
    }
  },
  mkdir: (args) => {
    const dir = Action.Directory.Current();
    dir[args[0]] = {};
    Action.Storage.Save();
  },
  pwd: () => {
    console.log(State.Path);
  },
  status: () => {
    console.log(`Wk up ${State.Tick * 3} seconds.`);
  },
  x: () => {
    console.log("Turn Off.");
    process.exit(0);
  },
};
