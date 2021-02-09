/**
 * 
 * @param {Array} projects 
 * @param {String} projectName 
 * @param {Number} projectOwner 
 */
const create = (projects,projectName, projectOwner) => {
        const hasSameName = projects.some(p => p.name === projectName && p.owner === projectOwner);
        if(hasSameName){
            throw new Error('can not create a project with same name')
        }

        const project = {
            id:Math.floor(Math.random() * 1000),
            name:projectName,
            owner:projectOwner,
            times:[]
        }
        return project
}

const remove = (projects, projectId, ownerId) =>  projects.filter(p => p.id !== projectId );
   
const startTimer = (projectId,userId, projects) => {
    return projects.map(project => {
        if(project.id === projectId){
            return {
                ...project,
                times:[
                    ...project.times,
                    {start:Date.now(), end:0, by:userId}
                ]
            }
        }
        return project
    })
} 
const endTimer = (projectId, userId, projects) => projects.map(project=>{
    if(project.id === projectId){
        return {
            ...project,
            times:project.times.map(time=>{
                if(time.end === 0 && userId === time.by){
                    return {
                        ...time,
                        end:Date.now()
                    }
                }
                return time
            })
        }
    }
    return project
})

const getUserTimes = (projects,userId) => projects.reduce((prev,current)=>{
    const times = current.times.filter(t => t.by === userId)
    if(times.length > 0){
        return [...prev,...times.filter(t=>t.start > 0 && t.end > 0)]
    }else{
        return prev
    }
},[])

const getUserOwnProjects = (projects,userId) => projects.filter(p => p.owner === userId);
const getUserProjects = (projects,userId) => {
    const user = users.find(u => u.id ===userId);
    return projects.filter(p=> user.projects.includes(p.id))
}


module.exports = {
    create,
    remove,
    startTimer,
    endTimer,
    getUserTimes,
    getUserOwnProjects,
    getUserProjects
}