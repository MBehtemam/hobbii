const createUser = (users,name) => {
    const hasSameName = users.find(u => u.name === name);
    if(hasSameName){
        throw new Error('username exists')
    }
    return  {
        id:Math.floor(Math.random()*1000),
        name,
        projects:[]
    }
}
const assignProjectsTo = (users,projectId,userId)=> users.map(user=>{
    if(user.id === userId){
        return {
            ...user,
            projects: user.projects.includes(projectId) ? user.projects : [...user.projects,projectId]
        }
    }
})
module.exports ={
    createUser,
    assignProjectsTo
}