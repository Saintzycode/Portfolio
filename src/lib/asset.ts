// Public files are served under the deploy base, e.g. /Portfolio/badges/x.png.
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
