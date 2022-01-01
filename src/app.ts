import express from 'express';
import postsRoute from './routes/posts';

const app = express();

app.use(express.json());

app.use('/api/posts', postsRoute);

app.listen(5000, () => {
  console.log('listening to port:5000');
});
