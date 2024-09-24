/* eslint-disable no-useless-escape */
export const getYouTubeId = (key: string) => {
  if (key.includes('youtube.com') || key.includes('youtu.be')) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = key.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }
  return key
}
