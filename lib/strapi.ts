// const STRAPI_URL =
//   typeof window === "undefined"
//     ? process.env.STRAPI_INTERNAL_URL
//     : process.env.NEXT_PUBLIC_STRAPI_URL;

// const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// export async function fetchStrapi(path: string) {
//   console.log("TOKEN:", STRAPI_TOKEN?.slice(0, 20), "| URL:", STRAPI_URL);
//   const res = await fetch(`${STRAPI_URL}${path}`, {
//     headers: {
//       Authorization: `Bearer ${STRAPI_TOKEN}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
//   return res.json();
// }

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function fetchStrapi(path: string) {
  console.log("TOKEN:", STRAPI_TOKEN?.slice(0, 20), "| URL:", STRAPI_URL);

  const res = await fetch(`${STRAPI_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  return res.json();
}