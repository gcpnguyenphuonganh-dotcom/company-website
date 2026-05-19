
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function fetchStrapi(path: string, locale?: string) {
  const url = locale
    ? `${STRAPI_URL}${path}${path.includes('?') ? '&' : '?'}locale=${locale}`
    : `${STRAPI_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  return res.json();
}