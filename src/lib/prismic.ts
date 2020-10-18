import Prismic from 'prismic-javascript';

export const api = process.env.NEXT_PUBLIC_API_URL;

export const client = (req = null) => {
  const options = req ? { req } : null;

  return Prismic.client(api, options);
}