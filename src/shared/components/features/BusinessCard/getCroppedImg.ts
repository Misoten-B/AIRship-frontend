import { Area } from 'react-easy-crop';

/**
 * urlをもとにimage要素を作成
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    // CodeSandboxでCORSエラーを回避するために必要
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

/**
 * 画像トリミングを行い新たな画像urlを作成
 */
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
): Promise<Blob | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // canvasサイズを設定
  canvas.width = image.width;
  canvas.height = image.height;

  // canvas上に画像を描画
  ctx.drawImage(image, 0, 0);

  // トリミング後の画像を抽出
  const width_ratio = pixelCrop.width / 100;
  const height_ratio = pixelCrop.height / 100;

  const trimed_width = canvas.width * width_ratio;
  const trimed_height = canvas.height * height_ratio;

  const data = ctx.getImageData(
    canvas.width * (pixelCrop.x / 100),
    canvas.height * (pixelCrop.y / 100),
    trimed_width,
    trimed_height,
  );

  // canvasのサイズ指定(切り取り後の画像サイズに更新)
  // canvas.width = pixelCrop.width;
  canvas.width = trimed_width;
  canvas.height = trimed_height;

  // 抽出した画像データをcanvasの左隅に貼り付け
  ctx.putImageData(data, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, 'image/png');
  });
}

export const blobToImage = (blob: Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = URL.createObjectURL(blob);
  });
