import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }`;

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }`;

export const SAVE_BOOK = gql`
mutation SaveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      email
      username
      savedBooks {
        bookId
        title
        description
        image
        link
        authors
      }
    }
  }
  `


export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      email
      username
      savedBooks {
        title
      }
    }
  }
  `;
