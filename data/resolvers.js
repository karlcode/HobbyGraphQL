import { Author, Post, FortuneCookie, Staff, Actor} from './connectors';
import fetch from 'node-fetch';

const resolvers = {
    Query: {                          // the only functions we can query on (top level of our graphql query)
      author(_, args) {               // _ == root
        return Author.find({ where: args });
      },
      allAuthors(_, args) {
        return Author.findAll();
      },
      getFortuneCookie(){
        return FortuneCookie.getOne()
      },
      findStaff(){
        return Staff.findAll();
      },
      getActor(){
        return Actor.findAll()
      },
      actor(_, args){
        return Actor.find({where: args})
      },
      getTickers(_, args){
        return fetch(`https://api.coinmarketcap.com/v1/ticker/`)
        .then(response => response.json())
      },
      getTicker(_, args){
        const { id } = args
        return fetch(`https://api.coinmarketcap.com/v1/ticker/${id}`)
        .then(response => response.json())
        .then(res => res[0])                    //gotta return the first item since we dont want an array but a single object
      },
    },
    Mutation: {
      addStaff(_, staff){
        var wrapper = {
          first_name: staff.first_name,
          last_name: staff.last_name,
          staff_id: staff.staff_id,
          address_id: staff.address_id,
          store_id: staff.store_id,
          username: staff.username
        }
        return Staff.create(wrapper)
      }
    },
    Author: {
      posts(author) {                 // posts relates exactly to the posts we derived in the schema. Here we are just defining where we get "posts" from
        return author.getPosts();       // param "author" means we perform a method on each author. We want the posts of each author in this case
      }
    },
    Post: {
      author(post) {
        return post.getAuthor();       // likewise, we want the author associated with a specific post in this case
      },                               // 'post couldve been reassigned as 'param' but makes more sense to be descriptively assigned
      views(post) {                  
        return View.findOne({ postId: post.id }).then(view => view.views);
      }
    }
    
  };
  
  export default resolvers;