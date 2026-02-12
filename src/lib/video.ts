export function getYoutubeThumbnail(id: string, quality: 'maxresdefault' | 'hqdefault' | 'sddefault' = 'maxresdefault') {
  return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
}

export const getYoutubeThumbnailFallbacks = (id: string) => ([
  getYoutubeThumbnail(id, 'maxresdefault'),
  getYoutubeThumbnail(id, 'hqdefault'),
  getYoutubeThumbnail(id, 'sddefault'),
]);
