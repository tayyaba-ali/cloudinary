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
      console.log("uploaded succesfully", resourceURl);
      //   let img = new Image()
      //   img.src = resourceURl

      //   gallery.appendChild(img)

      //   const pdfEmbed = document.createElement("embed")
      //   pdfEmbed.src = resourceURl
      //   pdfEmbed.type = "application/pdf"
      //   gallery.appendChild(pdfEmbed)
    })
    .catch((e) => {
      console.log(e);
    });
});

let dropArea = document.getElementById("dropArea");

dropArea.addEventListener("dragover", () => {
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
