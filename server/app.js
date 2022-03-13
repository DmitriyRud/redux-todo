require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const upload = require('./middlewares/middlewares');
const { Post } = require('./db/models');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.get('/posts', async (req, res) => {
  const posts = await Post.findAll({
    raw: true,
    order: [['createdAt', 'DESC']],
  });
  res.json({ posts }); // {posts: []}
});

app.get('/posts/:page', async (req, res) => {
  const pageAsNumber = Number.parseInt(req.params.page);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  const size = 2;
  const postsWidhCount = await Post.findAndCountAll({
    limit: size,
    offset: page * size,
    order: [['createdAt', 'DESC']],
  });
  res.json({
    content: postsWidhCount.rows,
    totalPages: Math.ceil(postsWidhCount.count / Number.parseInt(size)),
  });
});

app.post('/upload', upload.single('file'), async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    const post = await Post.create({
      title: req.body.title,
      img: `/img/${req.file.originalname}`,
    });
    res.json(post);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.delete('/post/:id', async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.status(202).json({ message: 'deleted' });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/post/:id', async (req, res) => {
  const currPost = await Post.findByPk(req.params.id);
  res.json(currPost);
});

app.listen(process.env.PORT, () => {
  console.log('server start ', process.env.PORT);
});
