import axios from 'axios';
import { Application } from 'express';

export default function (app: Application): void {

  app.get('/', async (req, res) => {
    res.redirect('tasks');   
  });

  app.get('/tasks/:id', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:4000/tasks/' + req.params.id);
      console.log(response.data);
      res.render('task', { 'task': response.data });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('error', {});
    }
  });

  app.get('/tasks', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:4000/tasks');
      console.log(response.data);
      res.render('tasks', { 'tasks': response.data });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('error', {});
    }
  });

  app.get('/create-task', async (req, res) => {
    try {    
      res.render('create-task', {});
    } catch (error) {
      console.error('Error making request:', error);
      res.render('error', {});
    }
  });

  app.post('/create-task', async (req, res) => {
    try {
      console.log(req.body);

      const year = req.body['due-date-year'];
      const month = req.body['due-date-month'];
      const day = req.body['due-date-day'];
      const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));

      const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: dueDate.toISOString(),
        status: 'Open'
      };

      const response = await axios.post('http://localhost:4000/tasks', task);
      if(response.status === 201) {
        const location = response.headers.location;
        res.redirect(302, location);
      } else {
        res.render('error', {});
      }
    
    } catch (error) {
      if (error instanceof RangeError) {
        res.render('create-task', { 'error': { code: 'due-date', message: error.message }, 'params': req.body });  
      } else {
        console.log('Problem here: ', error);
        res.render('create-task', { 'error': error.response?.data, 'params': req.body });
      }
    }
  });

  app.get('/update-task/:id', async (req, res) => {
    try {
      const response = await axios.get('http://localhost:4000/tasks/' + req.params.id);
      console.log('Task: ', response.data);
      const dueDate = new Date(response.data.dueDate);
      const day = dueDate.getDate();
      const month = dueDate.getMonth();
      const year = dueDate.getFullYear();
      res.render('update-task', { 'task': response.data, 'id': req.params.id, day, month, year });
    } catch (error) {
      console.error('Error making request:', error);
      res.render('error', {});
    }
  });    

  app.post('/update-task/:id', async (req, res) => {
    try {

      const year = req.body['due-date-year'];
      const month = req.body['due-date-month'];
      const day = req.body['due-date-day'];
      const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));

      const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: dueDate.toISOString(),
        status: req.body.status
      };
console.log('Task: ', req.body);
  
      const response = await axios.put('http://localhost:4000/tasks/' + req.params.id, task);
      if (response.status === 200) {
        res.render('task', { 'task': response.data });
      } else {
        res.render('error', {});
      }
    } catch(error) {
      if (error instanceof RangeError) {
        res.render('update-task', { 'error': { code: 'due-date', message: error.message }, 'params': req.body });  
      } else {
        console.log('Problem here: ', error);
        res.render('update-task', { 'error': error.response?.data, 'params': req.body });
      }
    }  
  });

  app.get('/delete/:id', async (req, res) => {
    try {

      const response1 = await axios.delete('http://localhost:4000/tasks/' + req.params.id);
      console.log(response1.status);
      if(response1.status === 204) {
        const response2 = await axios.get('http://localhost:4000/tasks');
        console.log(response2.data);
        res.render('tasks', {  'tasks': response2.data });
      } else {
        console.log(response1.data);
        res.render('error', {});
      }
    } catch (error) {
      console.error('Error making request:', error);
      res.render('error', {});
    }
  });
}
