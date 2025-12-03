const base_url ="https://itemshub-api.sidcloud.cn/"
const router = {
    index:base_url+"index",
    skin:{
        lts:base_url+"skin/lts"
    },
    market:{
        lts:base_url+"market/lts"
    },
    case:base_url+"case"
}

const api_index = async()=>
{
    const res = await fetch(router.index);
    return await res.json();
}

const api_case = async()=>
{
    const res = await fetch(router.case);
    return await res.json();
}

export{
    api_index,
    api_case
}