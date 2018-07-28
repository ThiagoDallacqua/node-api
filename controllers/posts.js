const Authentication = require('../middlewares/Authentication')


module.exports = app => {
  app.post('/create/post', Authentication.hasValidToken, (req, res) => {
    const model = app.models.post;
    const connect = app.infra.connectionFactory;
    const Posts = new app.infra.PostDAO(model, connect);

    const post = {
      user: {
        id: req.decoded.user._id,
        email: req.decoded.email
       },
       post: req.body.post
    };

    Posts.create(post, (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      response.save();


      res.json(response)
      return
    })
  });

  app.get('/posts', Authentication.hasValidToken, (req, res) => {
    const model = app.models.post;
    const connect = app.infra.connectionFactory;
    const Posts = new app.infra.PostDAO(model, connect);

    Posts.list(req.decoded.user._id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      const posts = result.map(({id, post}) => {
        const info = {
          id,
          post
        }

        return info
      });

      res.json(posts)
    });
  });

  app.delete('/post/:id', Authentication.hasValidToken, (req, res) => {
    const model = app.models.post;
    const connect = app.infra.connectionFactory;
    const Posts = new app.infra.PostDAO(model, connect);
    const id = req.params.id;

    const args = {
      userId: req.decoded.user._id,
      postId: id
    }

    Posts.delete(args, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err)

        return
      }

      res.json(result)
      return
    });
  });
}
