import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import fetch from 'node-fetch';
import { Pool } from 'pg';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const pool = new Pool({
  connectionString: 'postgresql://karlcode:Op3nsesame@myfirstdb.cigrvl7ua37i.ap-southeast-2.rds.amazonaws.com:5432/myfirstdb',
})
const sequelize = new Sequelize('postgresql://karlcode:Op3nsesame@myfirstdb.cigrvl7ua37i.ap-southeast-2.rds.amazonaws.com:5432/myfirstdb');

const AuthorModel = db.define('author', {           //defining schema for the database (sequelize specific)
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

const StaffModel = sequelize.define('staff', {           //defining schema for the database (sequelize specific)
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const Actor = sequelize.define('actor', {           //defining schema for the database (sequelize specific)
  first_name: { type: Sequelize.STRING },
  last_name: { type: Sequelize.STRING },
  actor_id : { type: Sequelize.INTEGER, primaryKey: true}
},
{ timestamps: false,
  underscored: true,
  freezeTableName: true});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);


// create mock data with a seed, so we always get the same
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(1, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      });
    });
  });
});

const FortuneCookie = {
    getOne() {
      return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
        .then(res => res.json())
        .then(res => {
          return res[0].fortune.message;
        });
    },
  };

sequelize.sync()

const Author = db.models.author;
const Post = db.models.post;
const Staff = sequelize.models.staff;

export { Author, Post, FortuneCookie, Staff, Actor};