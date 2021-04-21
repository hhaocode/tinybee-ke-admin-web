<template>
  <div>
    <video id="my-video" class="video-js vjs-default-skin" controls preload="auto">
      <!-- <source src="http://localhost:7001/test.m3u8" type="application/x-mpegURL"> -->
      <source src="http://127.0.0.1:7100/api/file/a.m3u8" type="application/x-mpegURL">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'videojs-contrib-hls'
export default {
  mounted () {
    videojs('my-video', {
      bigPlayButton: true,
      textTrackDisplay: false,
      posterImage: true,
      errorDisplay: false,
      controlBar: true
    }, function () {
      this.play()
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
