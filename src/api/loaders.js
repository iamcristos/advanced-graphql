const DataLoader = require('dataloader')
const Project = require('./project/project.model')
const Task = require('./task/task.model')
const { reposForOrg } = require('./github')
const _ = require('lodash')

const createProjectLoader = () => {
  return new DataLoader(projectIds => {
    return Project.find({_id: {$in: projectIds}})
      .exec()
      .then(projects => {
        console.log('projects loader batch: ', projectIds.length)
        const projectsById = _.keyBy(projects, '_id')
        return projectIds.map(projectId => projectsById[projectId])
      })
  })
}

const createTaskLoader = () => {
  // create task loader here
  return new DataLoader(tasksIds => {
    return Task.find({id: {$in: tasksIds} })
      .exec()
      .then(tasks =>{
        const taskById = _.keyBy(tasks, '_id')
        return tasksIds.map(taskId => taskById[taskId])
      })
  })
}

const createGitHubLoader = () => {
  // create github loader here. Use function from ./github.js
  return new DataLoader(repoName => {
    return reposForOrg().then(repo => {
      const repoNames = _.keyBy(repo, 'name')
      return repoName.map(name => repoNames[name])
    })
  })
}

module.exports = () => {
  return {
    project: createProjectLoader(),
    task: createTaskLoader(),
    repo: createGitHubLoader()
  }
}
