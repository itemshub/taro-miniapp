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
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export const base32Encode = (input: string) => {
  let buffer = new TextEncoder().encode(input);
  let output = '';
  let i = 0;

  while (i < buffer.length) {
    let bytes = buffer.slice(i, i + 5);

    // 5 bytes = 40 bits → 8 groups of 5 bits = 8 chars
    let bits = 0;
    let value = 0;

    for (let b of bytes) {
      value = (value << 8) | b;
      bits += 8;
      while (bits >= 5) {
        output += ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }

    if (bits > 0) {
      output += ALPHABET[(value << (5 - bits)) & 31];
    }

    i += 5;
  }

  return output;
};

export const base32Decode = (input: string) => {
  let cleaned = input.replace(/=+$/, '');
  let buffer = [];
  let bits = 0;
  let value = 0;

  for (let char of cleaned) {
    let index = ALPHABET.indexOf(char);
    if (index === -1) continue;

    value = (value << 5) | index;
    bits += 5;

    if (bits >= 8) {
      buffer.push((value >> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return new TextDecoder().decode(new Uint8Array(buffer));
};

export const getTimeDiffText = (time: string | number) => {
  const last = new Date(time).getTime();
  const now = Date.now();
  const diff = Math.floor((now - last) / 1000); // 秒差

  if (diff < 60) return `${diff} 秒前`;
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  return `${Math.floor(diff / 86400)} 天前`;
};