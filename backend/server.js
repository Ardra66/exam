// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());


// mongoose.connect('mongodb://localhost:27017/', {
// });


// const Task = mongoose.model('Task', {
//   title: String,
//   description: String
// });

// app.post('/tasks', async (req, res) => {
//   const task = new Task(req.body);
//   await task.save();
//   res.send(task);
// });

// app.get('/tasks', async (req, res) => {
//     try {
//       const tasks = await Task.find();
//       res.json(tasks);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching tasks' });
//     }
//   });
  

// app.listen(5000, () => console.log('Server started on port 5000'));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Task schema and model
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Task = mongoose.model('Task', taskSchema);

// Middleware
app.use(cors());
app.use(express.json());

// POST /tasks - Add new task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error saving task' });
  }
});

// GET /tasks - List tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
