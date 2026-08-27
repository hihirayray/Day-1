import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the task dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Taskroom — Student Task Dashboard<\/title>/i);
  assert.match(html, /What needs doing\?/);
  assert.match(html, /Revise the prototype interview notes/);
  assert.match(html, /Finish data structures practice set/);
  assert.match(html, /Prepare three questions for critique/);
  assert.match(html, /Add task/);
  assert.match(html, /class="task-count">3(?:<!-- -->)? (?:<!-- -->)?items/);
});
