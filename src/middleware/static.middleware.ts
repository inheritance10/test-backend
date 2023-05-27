import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';

@Injectable()
export class StaticMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const viewsPath = path.join(__dirname, '..', 'public'); // Sayfaların bulunduğu dizin yolu
    const pagePath = path.join(viewsPath, 'index.html'); // Göstermek istediğiniz sayfanın yolu

    res.sendFile(pagePath);
  }
}
