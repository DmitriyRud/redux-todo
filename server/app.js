require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
// const upload = require('./middlewares/middlewares');
const { Task } = require('./db/models');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.get('/tasks', async (req, res) => {
  const tasks = await Task.findAll({
    raw: true,
    order: [['createdAt', 'ASC']],
  });
  res.json({ tasks }); 
});

app.post('/tasks/add', async (req, res) => {
  console.log(req.body);
  try {
    const task = await Task.create({
      title: req.body.task,
      completed: false,
    });
    res.json(task);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.destroy({ where: { id: req.params.id } });
    res.status(202).json({ message: 'deleted' });
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/tasks/:id', async (req, res) => {
  const currTask = await Task.findByPk(req.params.id);
  res.json(currTask);
});

app.patch('/tasks/:id/rename', async (req, res)=>{
  const currTask = await Task.findByPk(req.params.id);
  currTask.title = req.body.title;
  await currTask.save();
  res.json(currTask);
});

app.patch('/tasks/:id', async (req, res) => {
  const currTask = await Task.findByPk(req.params.id);
  currTask.completed = !currTask.completed;
  await currTask.save();
  res.json(currTask);
})

app.listen(process.env.PORT, () => {
  console.log('server start ', process.env.PORT);
});
