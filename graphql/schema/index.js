const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        avatar: String
        email: String!
        bio: String
        posts: [Post!]!
    }
    type Post {
        author: User!
        title: String!
        date: String!
        comments: [Comment!]!
    }

    type Comment {
        author: User!
        text: String!
        name: String!
        avatar: String!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
        password2: String!
        name: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input PostInput {
        title: String!
        text: String!
    }

    input EditUserInput {
        name: String
        avatar: String
        bio: String
    }

    type AuthData {
        userId: ID!
        token: String!
    }

    type RootQuery {
        post(postId: ID!): Post!
        user(userId: ID, handle: String): User!
    }

    type RootMutation {
        register(userInput: UserInput): User!
        login(loginInput: LoginInput): AuthData!
        editUser(editInput: EditUserInput): User!
        follow(userId: ID!): User!
        unfollow(userId: ID!): User!
        addPost(postInput: PostInput): Post!
        commentPost(commentText: String!): Post!
    }
`);