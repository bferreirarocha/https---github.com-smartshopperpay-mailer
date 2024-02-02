const fs = require("fs");

const imageToBase64lib = require("image-to-base64");

// export async function imageToBase64(imagePath: string): Promise<string> {
//   try {
//     const base64String = await imageToBase64lib(imagePath);
//     return base64String;
//   } catch (error: any) {
//     console.error(
//       `Error converting PNG image to base64 (${imagePath}): ${error.message}`
//     );
//     throw error;
//   }
// }

// export function imageToBase64(imagePath: string): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//         base64Img.base64(imagePath, { format: 'png' }, (err: Error, data: string) => {
//             if (err) {
//                 console.error(`Error converting image to Base64 (${imagePath}): ${err}`);
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

// // Example usage:
// const imgTemplatePath = path.join('./src/utils/templates/order', 'images');
// const imagePath= path.join('./src/utils/templates/order/images')
//     const imageDataArray = [imgTemplatePath + "\\image-7.png", imgTemplatePath + "\\image-4.png"];
//     imageToBase64(imageDataArray[0])
//     .then(base64Data => {
//         console.log(base64Data);
//     })
//     .catch(error => {
//         console.error(error);
//     });
