const GOOGLE_API_KEY = "AIzaSyDrcfRVK6P_qyUCj0BRmxq9DubRyIosWsQ";

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" +
  GOOGLE_API_KEY;