// import multer from 'multer';
// import fs from 'fs';

// class FileUploads {
//   fileUpload(destination = "public") {
//     // Create destination folder if it doesn't exist
//     if (!fs.existsSync(destination)) {
//       fs.mkdirSync(destination, { recursive: true });
//     }

//     this.storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, `${destination}`);
//       },
//       filename: function (req, file, cb) {
//         let fileName = file.originalname.trim();
//         fileName = fileName.replace(/ /g, "-");
//         let imageName =
//           Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + fileName;
//         cb(null, imageName);
//       },
//     });

//     return multer({ storage: this.storage });
//   }

//   deleteFile(filePath) {
//     try {
//       fs.unlinkSync(filePath);
//       console.log(`File deleted successfully: ${filePath}`);
//     } catch (error) {
//       console.error(`Error deleting file: ${filePath}`, error);
//     }
//   }
// }

// export default FileUploads;


import multer from "multer";
import fs from "fs";

const fileUpload = (destination = "public") => {
  // Create destination folder if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${destination}`);
    },
    filename: (req, file, cb) => {
      let fileName = file.originalname.trim();
      fileName = fileName.replace(/ /g, "-");
      let imageName =
        Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + fileName;
      cb(null, imageName);
    },
  });

  return multer({ storage });
};

const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
  }
};

export { fileUpload, deleteFile };
