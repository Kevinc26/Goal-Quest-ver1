export const percent = (value: number, total: number) =>
  Math.min(100, Math.max(0, (value / Math.max(1, total)) * 100));

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const rest = Math.max(0, seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${rest}`;
};

export const publicAssetPath = (assetPath: string | undefined) => {
  if (!assetPath) {
    return "";
  }

  const cleanPath = assetPath.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  return `${normalizedBase}${cleanPath}`;
};
