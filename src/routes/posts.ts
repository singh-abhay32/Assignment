
/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts';
import control from '../controllers/liberarybooks'
const router = express.Router();


router.get('/posts', controller.getPosts);
router.get('/posts/:id', controller.getPost);
router.put('/posts/:id', controller.updatePost);
router.delete('/posts/:id', controller.deletePost);
router.post('/posts', controller.addPost);

router.get('/books',control.getbook);
router.get('/books/:id',control.getbooks);
router.put('/books/:id',control.updatebooks);
router.delete('/books/:id',control.deletebooks);
router.post('/books/:id',control.addbooks);

export = router;