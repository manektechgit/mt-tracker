const { ipcMain, desktopCapturer } = require("electron");

ipcMain.on("getData", (event, path) => {
  screenshot().then((img) => {
    console.log('renderer called')
    event.reply("getData", Buffer.from(img).toString('base64'));
  });
});


function fullscreenScreenshot(callback, imageFormat) {
  var _this = this;
  this.callback = callback;
  imageFormat = imageFormat || "image/jpeg";

  this.handleStream = (stream) => {
    // Create hidden video tag
    var video = document.createElement("video");
    video.style.cssText = "position:absolute;top:-10000px;left:-10000px;";

    // Event connected to stream
    video.onloadedmetadata = function () {
      // Set video ORIGINAL height (screenshot)
      video.style.height = this.videoHeight + "px"; // videoHeight
      video.style.width = this.videoWidth + "px"; // videoWidth

      video.play();

      // Create canvas
      var canvas = document.createElement("canvas");
      canvas.width = this.videoWidth;
      canvas.height = this.videoHeight;
      var ctx = canvas.getContext("2d");
      // Draw video on canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (_this.callback) {
        // Save screenshot to base64
        _this.callback(canvas.toDataURL(imageFormat));
      } else {
        console.log("Need callback!");
      }

      // Remove hidden video tag
      video.remove();
      try {
        // Destroy connect to stream
        stream.getTracks()[0].stop();
      } catch (e) {}
    };

    video.srcObject = stream;
    document.body.appendChild(video);
  };

  this.handleError = function (e) {
    console.log(e);
  };

  desktopCapturer
    .getSources({ types: ["window", "screen"] })
    .then(async (sources) => {
      console.log(sources);

      for (const source of sources) {
        // Filter: main screen
        if (
          source.name === "Entire screen" ||
          source.name === "Screen 1" ||
          source.name === "Screen 2"
        ) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: source.id,
                  minWidth: 1280,
                  maxWidth: 4000,
                  minHeight: 720,
                  maxHeight: 4000,
                },
              },
            });

            _this.handleStream(stream);
          } catch (e) {
            _this.handleError(e);
          }
        }
      }
    });
}