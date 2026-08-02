import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.join(process.cwd(), "public", "studios");

const sources = [
  {
    id: "club-pilates",
    page: "https://apps.apple.com/sa/app/club-pilates-saudi-arabia/id6479696130",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f9/b3/bc/f9b3bc61-f058-64f0-473f-100f4aa91139/AppIcon-1x_U007emarketing-0-10-0-85-220-0.png/512x512bb.jpg",
  },
  {
    id: "the-pilates-studio",
    page: "https://linktr.ee/thepilates.sa",
    image: "https://ugc.production.linktr.ee/6acfd13b-7cb9-462b-aa6c-762d3191ce38_TPS-logo.jpeg",
  },
  {
    id: "auranov-pilates",
    page: "https://nonamemai8.setmore.com/",
    image: "https://avatar.setmore.com/files/img/f0Ar19cHXqSh/bb22ddf5-3a6a-4f80-83c1-2478907fdd7f.jpeg?crop=2560%3B2560%3B0%3B0&h=800&w=800",
  },
  {
    id: "pilates-plus",
    page: "https://apps.apple.com/sa/app/p-ksa/id6746393998",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ca/be/b9/cabeb93c-40d4-361b-96f8-0cce62bf45b8/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg",
  },
  { id: "eluna-pilates", page: "https://www.instagram.com/eluna.pilates/" },
  {
    id: "orna",
    page: "https://apps.apple.com/sa/app/orna-wellness-house/id6743322951",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b7/c5/67/b7c56769-3882-ef4f-06e9-6bdfeeda6781/AppIcon-1x_U007emarketing-0-11-0-0-85-220-0.png/512x512bb.jpg",
  },
  { id: "solace-pilates", page: "https://www.instagram.com/solacepilates.sa/" },
  { id: "vialora-pilates", page: "https://www.instagram.com/vialora_pilates/" },
  { id: "in-form-pilates", page: "https://www.instagram.com/in.form.sa/" },
  {
    id: "reform-athletica-dq",
    page: "https://www.reformathletica.com/sa",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/7d/1c/20/7d1c2096-54c7-62d8-02b5-755001b37a49/AppIcon-1x_U007emarketing-0-8-0-0-0-85-220-0.png/512x512bb.jpg",
  },
  { id: "evolve-mind-body", page: "https://www.instagram.com/evolvestudio.me/" },
  {
    id: "slou-studio",
    page: "https://apps.apple.com/sa/app/slou-studio/id6768636998",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c1/23/4a/c1234aaf-107d-5a08-54f4-85db1e1567f4/AppIcon-1x_U007ephone-0-9-0-0-85-220-0.png/512x512bb.jpg",
  },
  { id: "retreat-pilates", page: "https://www.instagram.com/retreatsa/" },
  {
    id: "pilova-fitness-pilates",
    page: "https://apps.apple.com/sa/app/pilova/id6751625707",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c4/9b/ce/c49bceda-748f-d51f-c40f-79aea04713b8/AppIcon-1x_U007emarketing-0-11-0-0-85-220-0.png/512x512bb.jpg",
  },
  { id: "fzah-wellness", page: "https://www.instagram.com/fzah.sa/" },
  {
    id: "fitness-time-ladies",
    page: "https://apps.apple.com/sa/app/fitness-time-%D9%88%D9%82%D8%AA-%D8%A7%D9%84%D9%84%D9%8A%D8%A7%D9%82%D8%A9/id6496972792",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/93/2b/a8/932ba80b-1d56-c9d3-3b7f-1f0899d83f74/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg",
  },
  { id: "pure-yoga", page: "https://www.instagram.com/pureyogasa/" },
  { id: "hala-fitness", page: "https://www.instagram.com/hala.cf/" },
  { id: "muscles-factory", page: "https://www.instagram.com/musclesfactory.ksa/" },
  {
    id: "flexa-pilates",
    page: "https://apps.apple.com/sa/app/flexa-pilates-studio/id6470425645",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c8/38/d6/c838d607-c2d1-1066-46a8-bf260e999ac6/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  },
  {
    id: "nawapilate",
    page: "https://apps.apple.com/sa/app/nawa-pilates-studio/id6751629493",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d5/83/77/d5837782-a56c-1c40-41dd-f3d273aa67a1/AppIcon-1x_U007emarketing-0-11-0-0-85-220-0.png/512x512bb.jpg",
  },
  {
    id: "lily-pilates",
    page: "https://apps.apple.com/sa/app/lily-pilates/id6755492605",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cb/b3/dd/cbb3ddb8-2f0c-e6f6-4b44-de580161d127/AppIcon-1x_U007emarketing-0-11-0-0-85-220-0.png/512x512bb.jpg",
  },
  {
    id: "weal-pilates",
    page: "https://apps.apple.com/sa/app/weal-pilates/id6737240782",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b1/a7/01/b1a70160-c7b4-041a-d04b-1e0c3f328a28/AppIcon-1x_U007emarketing-0-11-0-0-85-220-0.png/512x512bb.jpg",
  },
  { id: "aurora-spa-hittin", page: "https://www.instagram.com/auroraspa.sa/" },
];

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&#x2F;", "/");
}

async function getImageUrl(source) {
  if (source.image) return source.image;

  const response = await fetch(source.page, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  if (!response.ok) throw new Error(`Page returned ${response.status}`);

  const html = await response.text();
  const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i);
  if (!match) throw new Error("Official profile image was not found");
  return decodeHtml(match[1]);
}

async function fetchImage(source) {
  const imageUrl = await getImageUrl(source);
  const response = await fetch(imageUrl, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  if (!response.ok) throw new Error(`Image returned ${response.status}`);

  const original = Buffer.from(await response.arrayBuffer());
  const logo = await sharp(original)
    .resize(430, 300, {
      fit: "inside",
      withoutEnlargement: false,
    })
    .webp({ quality: 92 })
    .toBuffer();

  const background = Buffer.from(
    `<svg width="1200" height="675" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="675" fill="#f3f5f1"/>
      <circle cx="600" cy="338" r="245" fill="#e5ece7"/>
      <circle cx="600" cy="338" r="205" fill="#ffffff"/>
    </svg>`,
  );

  const cover = await sharp(background)
    .composite([{ input: logo, gravity: "center" }])
    .webp({ quality: 88 })
    .toBuffer();

  await writeFile(path.join(outputDirectory, `${source.id}.webp`), cover);
  return {
    id: source.id,
    page: source.page,
  };
}

await mkdir(outputDirectory, { recursive: true });

const settled = await Promise.allSettled(sources.map(fetchImage));
const successful = settled
  .filter((result) => result.status === "fulfilled")
  .map((result) => result.value);
const failed = settled
  .map((result, index) => ({ result, source: sources[index] }))
  .filter(({ result }) => result.status === "rejected")
  .map(({ result, source }) => ({ id: source.id, error: result.reason.message }));

const unresolved = [];
for (const item of failed) {
  try {
    await access(path.join(outputDirectory, `${item.id}.webp`));
  } catch {
    unresolved.push(item);
  }
}

await writeFile(
  path.join(outputDirectory, "sources.json"),
  `${JSON.stringify(sources.map(({ id, page }) => ({ id, page })), null, 2)}\n`,
);

for (const item of successful) console.log(`Downloaded ${item.id}`);
for (const item of failed) console.warn(`Kept existing ${item.id}: ${item.error}`);

if (unresolved.length > 0) process.exitCode = 1;
