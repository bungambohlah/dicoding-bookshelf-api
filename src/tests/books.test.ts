import request from 'supertest';
import App from '@/app';
import { CreateBookDto } from '@dtos/books.dto';
import BookRoute from '@routes/books.route';
import { nanoid } from 'nanoid';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Books', () => {
  describe('[GET] /books', () => {
    it('response findAll books', async () => {
      const booksRoute = new BookRoute();
      const books = booksRoute.booksController.bookService.books;

      books.findMany = jest.fn().mockReturnValue([
        {
          id: nanoid(),
          name: 'Buku A',
          year: 2010,
          author: 'John Doe',
          summary: 'Lorem ipsum dolor sit amet',
          publisher: 'Dicoding Indonesia',
          pageCount: 100,
          readPage: 25,
          finished: false,
          reading: false,
          insertedAt: '2022-11-01T14:00:53.122Z',
          updatedAt: '2022-11-01T14:00:53.122Z',
        },
      ]);

      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}`).expect(200);
    });
  });

  describe('[GET] /books/:id', () => {
    it('response findOne book', async () => {
      const bookId = nanoid();

      const booksRoute = new BookRoute();
      const books = booksRoute.booksController.bookService.books;

      books.findFirst = jest.fn().mockReturnValue({
        id: bookId,
        name: 'Buku A',
        year: 2010,
        author: 'John Doe',
        summary: 'Lorem ipsum dolor sit amet',
        publisher: 'Dicoding Indonesia',
        pageCount: 100,
        readPage: 25,
        finished: false,
        reading: false,
        insertedAt: '2022-11-01T14:00:53.122Z',
        updatedAt: '2022-11-01T14:00:53.122Z',
      });

      const app = new App([booksRoute]);
      return request(app.getServer()).get(`${booksRoute.path}/${bookId}`).expect(200);
    });
  });

  describe('[POST] /books', () => {
    it('response Create book', async () => {
      const date = new Date().toISOString();
      const bookData: CreateBookDto = {
        name: 'Buku A',
        year: 2010,
        author: 'John Doe',
        summary: 'Lorem ipsum dolor sit amet',
        publisher: 'Dicoding Indonesia',
        pageCount: 100,
        readPage: 25,
        finished: false,
        reading: false,
        insertedAt: date,
        updatedAt: date,
      };

      const booksRoute = new BookRoute();
      const books = booksRoute.booksController.bookService.books;

      books.findFirst = jest.fn().mockReturnValue(null);
      books.create = jest.fn().mockReturnValue({
        name: 'Buku A',
        year: 2010,
        author: 'John Doe',
        summary: 'Lorem ipsum dolor sit amet',
        publisher: 'Dicoding Indonesia',
        pageCount: 100,
        readPage: 25,
        finished: false,
        reading: false,
        insertedAt: date,
        updatedAt: date,
      });

      const app = new App([booksRoute]);
      return request(app.getServer()).post(`${booksRoute.path}`).send(bookData).expect(201);
    });
  });

  describe('[PUT] /books/:id', () => {
    it('response Update book', async () => {
      const bookId = nanoid();
      const date = new Date().toISOString();
      const bookData: CreateBookDto = {
        name: 'Buku A',
        year: 2010,
        author: 'John Doe',
        summary: 'Lorem ipsum dolor sit amet',
        publisher: 'Dicoding Indonesia',
        pageCount: 100,
        readPage: 25,
        finished: false,
        reading: false,
        insertedAt: date,
        updatedAt: date,
      };

      const booksRoute = new BookRoute();
      const books = booksRoute.booksController.bookService.books;

      books.findFirst = jest.fn().mockReturnValue(bookData);
      books.update = jest.fn().mockReturnValue({
        name: 'Buku A',
        year: 2010,
        author: 'John Doe',
        summary: 'Lorem ipsum dolor sit amet',
        publisher: 'Dicoding Indonesia',
        pageCount: 100,
        readPage: 25,
        finished: false,
        reading: false,
        insertedAt: date,
        updatedAt: date,
      });

      const app = new App([booksRoute]);
      return request(app.getServer()).put(`${booksRoute.path}/${bookId}`).send(bookData).expect(200);
    });
  });

  describe('[DELETE] /books/:id', () => {
    it('response Delete book', async () => {
      const bookId = nanoid();
      const date = new Date().toISOString();
      const bookData: CreateBookDto & Record<'id', string> = {
        id: bookId,
        name: 'Buku A',
        year: 2010,
        author: 'John Doe',
        summary: 'Lorem ipsum dolor sit amet',
        publisher: 'Dicoding Indonesia',
        pageCount: 100,
        readPage: 25,
        finished: false,
        reading: false,
        insertedAt: date,
        updatedAt: date,
      };

      const booksRoute = new BookRoute();
      const books = booksRoute.booksController.bookService.books;

      books.findFirst = jest.fn().mockReturnValue(bookData);
      books.delete = jest.fn().mockReturnValue({
        name: 'Buku A',
        year: 2010,
        author: 'John Doe',
        summary: 'Lorem ipsum dolor sit amet',
        publisher: 'Dicoding Indonesia',
        pageCount: 100,
        readPage: 25,
        finished: false,
        reading: false,
        insertedAt: date,
        updatedAt: date,
      });

      const app = new App([booksRoute]);
      return request(app.getServer()).delete(`${booksRoute.path}/${bookId}`).expect(200);
    });
  });
});
