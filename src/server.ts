import App from '@/app';
import IndexRoute from '@routes/index.route';
import BooksRoute from '@/routes/books.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new BooksRoute()]);

app.listen();
