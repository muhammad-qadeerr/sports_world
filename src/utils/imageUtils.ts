const BACKEND_BASE_URL = "https://localhost:7096";

export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return "";
  
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${BACKEND_BASE_URL}${normalizedPath}`;
};
