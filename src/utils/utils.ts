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