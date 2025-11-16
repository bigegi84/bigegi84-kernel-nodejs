const readline = require("readline");

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
  let tick = 0;
  setInterval(() => {
    tick++;
    // console.log(`\n[Kernel Tick ${tick}]`);
    // syscall("status", {});
  }, 3000); // heartbeat tiap 3 detik
}

// user-space terminal
function userSpace() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "user> ",
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
      case "status":
        syscall("status", {});
        break;
      case "exit":
        console.log("Exiting kernel...");
        process.exit(0);
        break;
      default:
        console.log("Unknown command:", cmd);
    }

    rl.prompt();
  });
}

// entry point
console.log("[Kernel] Boot complete. Entering main loop + user space...");
kernelLoop();
userSpace();
