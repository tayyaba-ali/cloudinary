const cloudName = "dvsoxp0be";
const unsignedUploadPreset = "qweng7nv";

let fileInput = document.getElementById("fileInput");
let gallery = document.getElementById("gallery");
fileInput.addEventListener("change", () => {
  let file = fileInput.files[0];
  let url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  let fd = new FormData();
  fd.append("upload_preset", unsignedUploadPreset);
  fd.append("file", file);

  fetch(url, {
    method: "POST",
    body: fd,
  })
    .then((response) => response.json())
    .then((data) => {
      let resourceURl = data.secure_url;

      let transformedUrl = resourceURl.replace(
        "upload/",
        "upload/h_200,w_200/r_max/c_crop,g_face"
      );
      console.log("uploaded succesfully", resourceURl);

      console.log(data);

      if (data.format == "pdf" || data.format == "mp4") {
        let iframe = document.createElement("iframe");
        iframe.src = resourceURl;
        iframe.width = "500px";
        iframe.height = "500px";
        gallery.appendChild(iframe);
        console.log(iframe);
      } else {
        let img = new Image();
        img.src = transformedUrl;

        gallery.appendChild(img);
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

let dropArea = document.getElementById("dropArea");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("dragging over");
});
// dropArea.addEventListener("dragleave",()=>{
//     console.log("leaving");

// })

dropArea.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  console.log("dropped");

  console.log(event.dataTransfer.files);
});
