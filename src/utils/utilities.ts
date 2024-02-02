const fs = require('fs');
const base64Img = require('base64-img');

export function imageToBase64(imagePaths: string[]) {
    return Promise.all(imagePaths.map(imagePath => {
        return new Promise((resolve, reject) => {
            base64Img.base64(imagePath, (err: any, data: any) => {
                if (err) {
                    reject(`Error converting image to Base64: ${err}`);
                } else {
                    resolve(data);
                }
            });
        });
    }));
}

// Example usage:


// imageToBase64(imagePath)
//     .then(base64Data => {
//         console.log(base64Data);
//     })
//     .catch(error => {
//         console.error(error);
//     });
