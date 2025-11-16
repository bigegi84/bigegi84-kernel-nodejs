import { createInterface } from "readline";
import { Action } from "./Action.js";
import { State } from "./State.js";
import { UserSpace } from "./UserSpace.js";

// syscall table
const syscallTable = {
  print: (args) => console.log(args.message),
  status: () => console.log("[SYS_STATUS] Kernel OK, Modules healthy"),
  //   "status": () => {},
  spawn: (args) => console.log(`[SYS_SPAWN] Launching ${args.module}`),
};

// syscall dispatcher
function syscall(name, args) {
  if (syscallTable[name]) {
    // console.log(`Syscall invoked: ${name}`);
    return syscallTable[name](args);
  } else {
    console.log(`Invalid syscall: ${name}`);
  }
}

// kernel loop
function kernelLoop() {
  setInterval(() => {
    State.Tick++;
    // console.log(`\n[Kernel Tick ${tick}]`);
    // syscall("status", {});
  }, 3000); // heartbeat tiap 3 detik
}

// user-space terminal
function userSpace() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Wk> ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    const parts = line.trim().split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
      case "print":
        syscall("print", { message: args.join(" ") });
        break;
      case "spawn":
        syscall("spawn", { module: args[0] || "SatelliteLoader" });
        break;
      // case "status":
      //   syscall("status", {});
      //   break;
      case "touch":
        const currentDirectory = Action.Directory.Current();
        currentDirectory[args[0]] = "";
        Action.Storage.Save();
        break;
      case "poweroff":
        console.log("Turn off.");
        process.exit(0);
        break;
      default:
      // console.log("Unknown command:", cmd);
    }

    if (UserSpace[cmd]) {
      UserSpace[cmd](args);
    } else {
      console.log("Unknown command:", cmd);
    }
    rl.prompt();
  });
}

// entry point
console.log("[Kernel] Boot complete. Entering main loop + user space...");
const Init = () => {
  State.Storage = Action.Storage.Get();
};
Init();
kernelLoop();
userSpace();
