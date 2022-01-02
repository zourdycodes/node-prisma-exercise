import express from 'express';
import postsRoute from './routes/posts';
import usersRoute from './routes/users';

const app = express();

app.use(express.json());

app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);

app.listen(5000, () => {
  console.log('listening to port:5000');
});
