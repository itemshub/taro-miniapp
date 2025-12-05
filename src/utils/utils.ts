// RFC 4648 Base32 算法（纯 JavaScript 实现）
// 兼容 Taro 小程序（weapp/tt/h5 全平台）

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Encode(input: string): string {
  let bits = '';
  let encoded = '';

  for (let i = 0; i < input.length; i++) {
    const bin = input.charCodeAt(i).toString(2).padStart(8, '0');
    bits += bin;
  }

  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substring(i, i + 5);
    if (chunk.length < 5) {
      encoded += alphabet[parseInt(chunk.padEnd(5, '0'), 2)];
    } else {
      encoded += alphabet[parseInt(chunk, 2)];
    }
  }

  return encoded;
}

export function base32Decode(input: string): string {
  let bits = '';
  let decoded = '';

  for (let i = 0; i < input.length; i++) {
    const idx = alphabet.indexOf(input[i]);
    bits += idx.toString(2).padStart(5, '0');
  }

  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.substring(i, i + 8);
    if (byte.length === 8) {
      decoded += String.fromCharCode(parseInt(byte, 2));
    }
  }

  return decoded;
}



export const getSkinsById = (skins:any,id:string)=>
{
    for(let i of skins)
    {
        if(i.skin?.toLocaleLowerCase() == id.toLocaleLowerCase())
        {
            return i;
        }
    }
    return false;
}
export const getSkinsNameById = (skins:any,id:string)=>
{
    for(let i of skins)
    {
        if(i.id?.toLocaleLowerCase() == id.toLocaleLowerCase())
        {
            return i;
        }
    }
    return false;
}
export const getMarketsByName = (markets:any,id:string)=>
{
  // console.log(markets)
    for(let i of markets)
    {
        if(i.name?.toLocaleLowerCase() == id.toLocaleLowerCase())
        {
            return i;
        }
    }
    return false;
}

export const getTimeDiffText = (time: string | number) => {
  const last = new Date(time).getTime();
  const now = Date.now();
  const diff = Math.floor((now - last) / 1000); // 秒差

  if (diff < 60) return `${diff} 秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  return `${Math.floor(diff / 86400)} 天前`;
};