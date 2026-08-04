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
  assert.match(html, /أهلًا بك في Aura/);
  assert.match(html, /رقم الجوال/);
  assert.match(html, /تشغيل Aura/);
  assert.doesNotMatch(html, /التنقل الرئيسي|تنقل الكمبيوتر/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/);
});

test("uses the approved Aura identity assets", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  await Promise.all([
    access(new URL("../public/brand/aura-logo-on-dark.png", import.meta.url)),
    access(new URL("../public/brand/aura-logo-on-light.png", import.meta.url)),
    access(new URL("../public/brand/aura-mark-on-dark.png", import.meta.url)),
    access(new URL("../public/brand/aura-mark-on-light.png", import.meta.url)),
    access(new URL("../public/brand/aura-wordmark-on-dark.png", import.meta.url)),
    access(new URL("../public/brand/aura-wordmark-on-light.png", import.meta.url)),
  ]);

  assert.match(page, /const assetName = full \? "aura-logo" : "aura-mark"/);
  assert.match(page, /\$\{assetName\}-on-light\.png/);
  assert.match(page, /\$\{assetName\}-on-dark\.png/);
  assert.match(page, /function SplashScreen/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /setShowSplash\(false\)/);
  assert.match(page, /\["home", "explore", "studio", "bookings", "account"/);
  assert.match(page, /\? <BottomNav current=\{screen\} onGo=\{go\} \/>/);
  assert.doesNotMatch(page, /\["schedule", "session", "checkout", "payment", "success"\]\.includes\(screen\)/);
});

test("keeps the booking draft, customer bookings, and studio capacity in sync", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /type BookingDraft =/);
  assert.match(page, /dateISO: string/);
  assert.match(page, /time24: string/);
  assert.match(page, /function getTimeSlots/);
  assert.match(page, /const \[bookings, setBookings\]/);
  assert.match(page, /const \[managedClasses, setManagedClasses\]/);
  assert.match(page, /aura-prototype-state-v2/);
  assert.match(page, /setManagedBookings\(\(current\) =>/);
  assert.match(page, /booked: Math\.min\(item\.capacity, item\.booked \+ 1\)/);
  assert.match(page, /QRCodeSVG/);
  assert.doesNotMatch(page, /buildCandidateSession/);
});

test("labels prototype-only authentication and payment honestly", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /نسخة تجريبية/);
  assert.match(page, /لن يتم خصم مبلغ حقيقي/);
  assert.match(page, /const \[acceptedTerms, setAcceptedTerms\] = useState\(false\)/);
});

test("starts each destination screen from the top", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /document\.querySelectorAll<HTMLElement>\("\.app-screen, \.desktop-view"\)/);
  assert.match(page, /container\.scrollTo\(\{ top: 0, left: 0, behavior: "auto" \}\)/);
  assert.match(page, /\}, \[screen\]\)/);
});

test("routes the two prototype phone numbers to their intended experiences", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /0500000000/);
  assert.match(page, /0511111111/);
  assert.match(page, /onStart\("management"\)/);
  assert.match(page, /onStart\("home"\)/);
});

test("keeps customer settings separate from studio management", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const accountStart = page.indexOf("function AccountScreen");
  const accountEnd = page.indexOf("function ProfileScreen");
  const accountScreen = page.slice(accountStart, accountEnd);

  assert.doesNotMatch(accountScreen, /إدارة المركز|الإشعارات|الدعم/);
  assert.match(accountScreen, /الملف الشخصي/);
  assert.match(accountScreen, /المفضلة/);
  assert.match(accountScreen, /طرق الدفع/);
  assert.match(page, /الاسم الكامل/);
  assert.match(page, /البريد الإلكتروني/);
  assert.match(page, /تاريخ الميلاد/);
  assert.match(page, /المراكز المفضلة/);
  assert.match(page, /المدربون المفضلون/);
  assert.match(page, /استقبال الإشعارات/);
  assert.match(page, /toggleFavoriteTrainer/);
  assert.match(page, /تسجيل الخروج/);
  assert.match(page, /className="menu-row logout-row"/);
  assert.match(page, /onExit=\{\(\) => setScreen\("login"\)\}/);
});

test("normalizes phone input and requires exactly ten digits", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /function normalizePhoneDigits/);
  assert.match(page, /٠١٢٣٤٥٦٧٨٩/);
  assert.match(page, /۰۱۲۳۴۵۶۷۸۹/);
  assert.match(page, /\.slice\(0, 10\)/);
  assert.match(page, /phone\.length !== 10/);
  assert.match(page, /maxLength=\{10\}/);
  assert.match(page, /pattern="\[0-9\]\{10\}"/);
});

test("keeps a local official source for every visible studio identity", async () => {
  const sourcesUrl = new URL("../public/studios/sources.json", import.meta.url);
  const pageUrl = new URL("../app/page.tsx", import.meta.url);
  const [sourcesText, page] = await Promise.all([
    readFile(sourcesUrl, "utf8"),
    readFile(pageUrl, "utf8"),
  ]);
  const sources = JSON.parse(sourcesText);

  assert.equal(sources.length, 22);
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

test("includes the focused studio operations experience", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(page, /إدارة المركز/);
  assert.match(page, /الحجوزات/);
  assert.match(page, /جدول الحصص/);
  assert.match(page, /إضافة حصة/);
  assert.match(page, /إضافة مدرب/);
  assert.match(page, /تسجيل الحضور/);
});
