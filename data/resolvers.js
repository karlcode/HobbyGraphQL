import { Author, Post, FortuneCookie, Staff} from './connectors';

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
    },
    
  };
  
  export default resolvers;