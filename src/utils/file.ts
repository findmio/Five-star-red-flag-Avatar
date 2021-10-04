export async function getDataUrl(file: File | Blob): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result as string)
    }
  })
}


export function dataURLtoBlob(base64Str: string) {
  var bstr = atob(base64Str), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: 'image/png' });
}