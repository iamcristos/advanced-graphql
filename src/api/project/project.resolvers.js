// resolve the query you made
const Project = require('./project.model');

const project = (_,{id}) => Project.findById(id).exec();

const projects = () => Project.find({}).exec();

const newProject = (_, {input}) => Project.create(input);

const updateProject = (_, {id, input}) => Project.findByIdAndUpdate(id, input, {new: true}).exec()

module.exports = {
  Query: {
    project,
    projects
  },

  Mutation: {
    newProject,
    updateProject
  }
}
