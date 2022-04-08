function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

export const getChildrenUserMails = (mailGroup,mailGroupsData,gatherGrandchild) => {
    let users = new Set()
    const address = mailGroupsData.get(mailGroup).children
    console.log(address)
    address.forEach(element => {
        console.log("test10")
        if(mailGroupsData.has(element)){
            // グループ 
            if(gatherGrandchild){
                users = union(users,getChildrenUserMails(element,mailGroupsData,true))
            }
        } else {
            //　ユーザー
            users.add(element)
        }
    });
    console.log(mailGroup)
    console.log(users)
    return users
}