const db = require('../db')
const { runQuery } = require('../run')
const projectResolvers = require('../../src/api/project/project.resolvers')

// tests are executed using Jest https://facebook.github.io/jest/

describe('Project', () => {
  beforeAll(db.connectToDB)
  afterAll(db.disconnectDB)
  afterEach(db.cleanDB)

  describe('resolvers', () => {
    describe('project', () => {
      test('should resolve correctly', async () => {
        // test the resolver function
        await db.models.project.create(
          {name: 'test', description: 'testing'},
          // {name: 'test2'}, {description: 'testing2'}
        )
        const projectResult = await projectResolvers.Query.projects({}, {}, {
          models: {
            project: db.models.project
          }
        })

        expect(projectResult).toHaveLength(1)
      })

      test('should have correct query', async () => {
        // run an actual query and test result
        const query = `
          query {
            projects {
              id
              name
            }

          }
        `;

        const result = await runQuery(query)

        expect(result.errors).toBeUndefined()
      })
    })
  })
})
