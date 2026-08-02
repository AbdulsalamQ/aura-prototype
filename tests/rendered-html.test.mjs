import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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

test("server-renders the Aura booking experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Aura \| نموذج حجوزات البيلاتس واليوغا<\/title>/i);
  assert.match(html, /حصة الدويغري/);
  assert.match(html, /Club Pilates Takhassusi/);
  assert.match(html, /studios\/club-pilates-cover-v2\.webp/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
});

test("keeps a local official source for every visible studio identity", async () => {
  const sourcesUrl = new URL("../public/studios/sources.json", import.meta.url);
  const pageUrl = new URL("../app/page.tsx", import.meta.url);
  const [sourcesText, page] = await Promise.all([
    readFile(sourcesUrl, "utf8"),
    readFile(pageUrl, "utf8"),
  ]);
  const sources = JSON.parse(sourcesText);

  assert.equal(sources.length, 24);
  assert.equal(new Set(sources.map(({ id }) => id)).size, sources.length);
  assert.ok(sources.every(({ page: sourcePage }) => /^https:\/\//.test(sourcePage)));
  assert.equal(
    sources.find(({ id }) => id === "hala-fitness")?.page,
    "https://www.halacf.com/",
  );

  await Promise.all(
    sources.flatMap(({ id }) => [
      access(new URL(`../public/studios/${id}.webp`, import.meta.url)),
      access(new URL(`../public/studios/${id}-cover-v2.webp`, import.meta.url)),
    ]),
  );

  assert.match(page, /officialStudioSources/);
  assert.match(page, /الهوية الرسمية للمركز/);
  assert.match(page, /hala-fitness-cover-v3/);
  assert.match(page, /orna-cover-v3/);
  assert.match(page, /pilates-plus-cover-v3/);
  assert.match(page, /\$\{studio\.id\}-cover-v2/);
});
