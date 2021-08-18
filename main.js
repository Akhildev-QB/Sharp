const sharp = require("sharp");
const fs = require("fs");
const ogBasePath = "./original/";

const convertedPath = "./output/";
const dimenstions = [
  {
    type: "_b",
    dimension: [500, 600],
  },
  {
    type: "_d",
    dimension: [2000, 2400],
  },
  {
    type: "_m",
    dimension: [127, 152],
  },
  {
    type: "_original",
    dimension: null,
  },
  {
    type: "_pvs",
    dimension: [2100, 2100],
  },
  {
    type: "_s",
    dimension: [70, 84],
  },
  {
    type: "_tmall",
    dimension: [1000, 1200],
  },
  {
    type: "_twOrig",
    dimension: [1000, 1000],
  },
  {
    type: "_twThumb",
    dimension: [650, 780],
  },
  {
    type: "_z",
    dimension: [1500, 1800],
  },
  {
    type: '_""',
    dimension: [364, 436],
  },
];

fs.readdir(ogBasePath, async function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  await Promise.all(
    files.map(async (fileName) => {
      return {
        file: fileName,
        dimInfo: await Promise.all(
          dimenstions.map(async (dim) => {
            console.log(dim, fileName);
            return {
              type: dim.type,
              info: await sharp(ogBasePath + fileName)
                .resize(...(dim.dimension || []))
                // .jpeg({
                //   quality: 70,
                // })
                .toFile(
                  convertedPath +
                    dim.type +
                    "/" +
                    fileName.split(".")[0] +
                    dim.type +
                    ".jpg"
                ),
            };
          })
        ),
      };
    })
  );

  console.log("Succesful");
});
