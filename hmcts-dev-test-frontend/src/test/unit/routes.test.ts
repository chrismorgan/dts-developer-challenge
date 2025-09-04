// src/test/unit/routes/home.test.ts
import { app } from '../../main/app';

import axios from 'axios';
import request from 'supertest';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console methods to reduce test noise
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /', () => {
    test('should redirect to tasks', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(302);
      expect(response.headers.location).toBe('tasks');
    });
  });

  describe('GET /tasks', () => {
    test('should render tasks page with data', async () => {
      const mockTasks = [{ id: '1', title: 'Test Task' }];
      mockedAxios.get.mockResolvedValue({ data: mockTasks });

      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/tasks');
    });

    test('should render error page on backend failure', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Backend error'));

      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
    });
  });

  describe('POST /create-task', () => {
    test('should create task and redirect on success', async () => {
      const mockResponse = {
        status: 201,
        headers: { location: '/tasks/123' }
      };
      mockedAxios.post.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post('/create-task')
        .send({
          title: 'Test Task',
          description: 'Test Description',
          'due-date-day': '31',
          'due-date-month': '12',
          'due-date-year': '2025'
        });

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe('/tasks/123');
    });

    test('should handle date validation error', async () => {
      const mockError = new RangeError('Invalid date');
      mockedAxios.post.mockRejectedValue(mockError);

      const response = await request(app)
        .post('/create-task')
        .send({
          title: 'Test Task',
          'due-date-day': '32',
          'due-date-month': '13',
          'due-date-year': '2025'
        });

      expect(response.status).toBe(200);
    });

    test('should handle backend validation error', async () => {
      const mockError = {
        response: {
          data: { code: 'due-date', message: 'The due date should be in the future' }
        }
      };
      mockedAxios.post.mockRejectedValue(mockError);

      const response = await request(app)
        .post('/create-task')
        .send({
          title: 'Test Task',
          'due-date-day': '1',
          'due-date-month': '1',
          'due-date-year': '2020'
        });

      expect(response.status).toBe(200);
    });
  });

  describe('GET /tasks/:id', () => {
    test('should render task detail page', async () => {
      const mockTask = { id: '123', title: 'Test Task' };
      mockedAxios.get.mockResolvedValue({ data: mockTask });

      const response = await request(app).get('/tasks/123');
      expect(response.status).toBe(200);
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:4000/tasks/123');
    });
  });

  describe('PUT /update-task/:id', () => {
    test('should update task successfully', async () => {
      const mockTask = { id: '123', title: 'Updated Task' };
      mockedAxios.put.mockResolvedValue({ status: 200, data: mockTask });

      const response = await request(app)
        .post('/update-task/123')
        .send({
          title: 'Updated Task',
          'due-date-day': '31',
          'due-date-month': '12',
          'due-date-year': '2025',
          status: 'Open'
        });

      expect(response.status).toBe(200);
    });
  });

  describe('GET /delete/:id', () => {
    test('should delete task and render tasks page', async () => {
      mockedAxios.delete.mockResolvedValue({ status: 204 });
      mockedAxios.get.mockResolvedValue({ data: [] });

      const response = await request(app).get('/delete/123');
      expect(response.status).toBe(200);
    });
  });
});