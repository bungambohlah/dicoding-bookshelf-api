import { NextFunction, Request, Response } from 'express';
import { Book, Prisma } from '@prisma/client';
import bookService from '@/services/books.service';

class BooksController {
  public bookService = new bookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBooksData: Book[] = await this.bookService.findAllBook(req.query);

      res.status(200).json({
        status: 'success',
        data: { books: findAllBooksData.map(({ id, name, publisher }) => ({ id, name, publisher })) },
      });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = req.params.id;
      const findOneBookData: Book = await this.bookService.findBookById(bookId);

      res.status(200).json({ status: 'success', data: { book: findOneBookData } });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookData: Prisma.BookCreateInput = req.body;
      const createBookData: Book = await this.bookService.createBook(bookData);

      res.status(201).json({ status: 'success', data: { bookId: createBookData.id }, message: 'Buku berhasil ditambahkan' });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = req.params.id;
      const bookData: Prisma.BookUpdateInput = req.body;
      await this.bookService.updateBook(bookId, bookData);

      res.status(200).json({ status: 'success', message: 'Buku berhasil diperbarui' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = req.params.id;
      await this.bookService.deleteBook(bookId);

      res.status(200).json({ status: 'success', message: 'Buku berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;
