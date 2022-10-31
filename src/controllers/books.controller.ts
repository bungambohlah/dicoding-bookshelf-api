import { NextFunction, Request, Response } from 'express';
import { Book } from '@prisma/client';
import { CreateBookDto } from '@/dtos/books.dto';
import bookService from '@/services/books.service';

class BooksController {
  public bookService = new bookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBooksData: Book[] = await this.bookService.findAllBook();

      res.status(200).json({ data: findAllBooksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = req.params.id;
      const findOneBookData: Book = await this.bookService.findBookById(bookId);

      res.status(200).json({ data: findOneBookData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookData: CreateBookDto = req.body;
      const createBookData: Book = await this.bookService.createBook(bookData);

      res.status(201).json({ data: createBookData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = req.params.id;
      const bookData: CreateBookDto = req.body;
      const updateBookData: Book = await this.bookService.updateBook(bookId, bookData);

      res.status(200).json({ data: updateBookData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookId = req.params.id;
      const deleteBookData: Book = await this.bookService.deleteBook(bookId);

      res.status(200).json({ data: deleteBookData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BooksController;
