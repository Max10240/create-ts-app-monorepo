import { executeCmd, executeCmdWithResult } from "@/service/command/index.js";
import { expect, test } from "vitest";

test('executeCmd success', async () => {
  await executeCmd('echo', ['123', '456'], {
    afterSpawn(childProcess) {
      childProcess.on('exit', (code) => expect(code).toBe(0));
    },
  });

  await executeCmd('exit', ['0'], {
    afterSpawn(childProcess) {
      childProcess.on('exit', (code) => expect(code).toBe(0));
    },
  });
});

test('executeCmd fail', async () => {
  let exitCode: number | null = null;
  await executeCmd('__non-exist_command__', [], {
    afterSpawn(childProcess) {
      childProcess.on('exit', (code) => exitCode = code);
    },
  });
  expect(exitCode).toBe(127);

  await executeCmd('exit', ['1'], {
    afterSpawn(childProcess) {
      childProcess.on('exit', (code) => expect(code).toBe(1));
    },
  });
});

test('executeCmdWithResult success', async () => {
  const output = await executeCmdWithResult('echo 123 456');
  expect(output).toBe('123 456');
});

test('executeCmdWithResult success, no output', async () => {
  const output = await executeCmdWithResult('exit 0');
  expect(output).toBe('');
});

test('executeCmdWithResult fail', async () => {
  const output = await executeCmdWithResult('exit 1');
  expect(output).toBe(null);
});
