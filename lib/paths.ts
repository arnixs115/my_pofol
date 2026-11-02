// Public files need the same prefix as Next's generated assets on project Pages.
export const publicAsset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
