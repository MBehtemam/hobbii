const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { create:createProject } = require('./util/project');
const { getHumanTimes } = require('./util/time');
const { calculatePrice } = require('./util/price');
const {createUser,assignProjectsTo} = require('./util/user')

let users = require('./data/users');
let projects = require('./data/projects');

const app = express();

const typeDefs = gql`
  type User {
    id: Int!
    name: String
    projects: [Project]
  }
  type Project {
    id: Int!
    name: String
    owner: User!
    times: [Time]
    reports: [Report]
  }
  type Time {
    start: Int!
    end: Int!
    by: User!
  }
  type Report {
    user: User
    totalTimeInMinutes: Int
    invoice: Float
  }
  type Query {
    users: [User]
    projects: [Project]
    project(id: Int): Project
    user(id:Int!):User
  }
  type Mutation{
      createUser(name:String!):User
      createProject(projectName:String!, projectOwnerId:Int!):Project
      removeProject(projectId:Int!,projectOwnerId:Int!):Boolean
      assignProjectTo(projectId:Int!,projectOwnerId:Int!,userId:Int!):Boolean
  }
`;
const resolvers = {
  Query: {
    users: () => users,
    projects: () => projects,
    user:(parent,args)=> users.find(u => u.id === args.id)
  },
  Mutation:{
    createUser:(parent,args) => {
        try{
            const user = createUser(users,args.name);
            users = [...users,user]
            return user
        }catch(err){
            throw new Error(err)
        }
    },
    createProject:(parent,args,ctx)=>{
        try{
            const project = createProject(projects,args.projectName,args.projectOwnerId)
            projects = [...projects, project]
            return project
        }catch(err){
            throw new Error(err)
        }
    },
    removeProject:(parent,args) => {
        let project = null;
        projects = projects.filter(p =>{
            if(p.id === args.projectId && p.owner === args.projectOwnerId){
                project = p;
            }else{
                return p;
            }
        })
        if(project){
            users = users.map(user=>({
                ...user,
                projects: user.projects.filter(pId => pId !== args.projectId)
            }))
            return true;
        }
        else{
            return false;
        }
    },
    assignProjectTo:(parent,args)=>{
        users = assignProjectsTo(users,args.projectId,args.userId)
        return true
    }
  },
  User: {
    projects: (parent, args) =>
      projects.filter((p) => parent.projects.includes(p.id)),
  },
  Project: {
    owner:(parent,args)=> users.find(u => u.id === parent.owner),
    reports: (parent, ctx, args) => {
      const timesByUserId = {};
      parent.times.forEach((time) => {
        if (timesByUserId[`${time.by}`]) {
          timesByUserId[time.by].times.push(time);
        } else {
          timesByUserId[time.by] = { id: time.by, times: [time] };
        }
      });
      return Object.keys(timesByUserId).map((key) => {
        const totalTimeInMinutes =  getHumanTimes(timesByUserId[key].times)
        return {
          user: users.find((u) => u.id === timesByUserId[key].id),
          totalTimeInMinutes,
          invoice: calculatePrice(totalTimeInMinutes, 500),
        };
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(8000, () => {
  console.log('Server Listen on PORT => 8000');
});
