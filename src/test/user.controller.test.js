import usersController from '../src/controllers/users.controller.js';
import { usersService } from '../src/services/index.js';

jest.mock('../src/services/index.js');

describe('getUser', () => {
  it('debe responder con 404 si el usuario no existe', async () => {
    usersService.getUserById.mockResolvedValue(null);

    const req = { params: { uid: 'abc123' } };
    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    const next = jest.fn();

    await usersController.getUser(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].status).toBe(404);
    expect(next.mock.calls[0][0].message).toBe('User not found');
  });

  it('debe devolver el usuario si existe', async () => {
    const fakeUser = { id: 'abc123', name: 'Luna' };
    usersService.getUserById.mockResolvedValue(fakeUser);

    const req = { params: { uid: 'abc123' } };
    const res = {
      send: jest.fn()
    };
    const next = jest.fn();

    await usersController.getUser(req, res, next);

    expect(res.send).toHaveBeenCalledWith({ status: 'success', payload: fakeUser });
  });
});
