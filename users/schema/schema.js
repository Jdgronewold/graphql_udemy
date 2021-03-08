const graphql = require('graphql')
const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        const usersData = await axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
        return usersData.data
      }
    }
  })
})


const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString},
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parentValue, args) {
        // parentValue here is the user that was fetched
        const companyData = await axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
        return companyData.data
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const data = await axios.get(`http://localhost:3000/users/${args.id}`)
        return data.data
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        const data = await axios.get(`http://localhost:3000/companies/${args.id}`)
        return data.data
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType, // type of data returned from resolve function
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios.post(`http://localhost:3000/users`, { ...args } ).then(res => res.data)
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) }},
      resolve(parentValue, args) {
        return axios.delete(`http://localhost:3000/users/${args.id}`).then(res => res.data)
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, {id, ...patchData }) {
        return axios.patch(`http://localhost:3000/users/${id}`, { ...patchData }).then(res => res.data)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})


// Query Fragment: 
// fragment companyDetails on Company {
//   id
//   name
//   description
// }


