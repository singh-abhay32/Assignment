import express from 'express';
import userController from '../controllers/users';
import auth from './../middlewres/auth.middleware'
import bookContrller from '../controllers/books'
import authController from '../controllers/auth'
const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/books', auth, bookContrller.getAllBooks);
router.get('/books/:id', auth, bookContrller.getBook);
router.put('/books/:id', auth, bookContrller.updateBook);
router.delete('/books/:id',auth, bookContrller.deleteBook);
router.post('/books',auth, bookContrller.addBook);

router.post('/login',authController.getUser);
router.post('/register',authController.registerUser);


export = router;