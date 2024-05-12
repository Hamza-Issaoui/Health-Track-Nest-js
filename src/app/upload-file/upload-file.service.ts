import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadFileService {
    uploadFile(file): string {
        try {
          // Define the destination directory based on the file type
          let destinationDirectory = '';
          const allowedImageTypes = ['jpg', 'jpeg', 'png'];
          const allowedDocumentTypes = ['pdf'];
      
          const fileExtension = file.originalname.split('.').pop().toLowerCase();
          if (allowedImageTypes.includes(fileExtension)) {
            destinationDirectory = './uploads/images';
          } else if (allowedDocumentTypes.includes(fileExtension)) {
            destinationDirectory = './uploads/files';
          } else {
            throw new Error('Unsupported file type');
          }
      
          // Ensure the destination directory exists, create it if it doesn't
          if (!fs.existsSync(destinationDirectory)) {
            fs.mkdirSync(destinationDirectory, { recursive: true });
          }
      
          // Save file to the filesystem
          const fileName = file.originalname;
          const filePath = path.join(destinationDirectory, fileName);
          fs.writeFileSync(filePath, file.buffer);
          
          return filePath;
        } catch (error) {
          console.error('Failed to upload file:', error.message);
          throw new Error('Failed to upload file');
        }
      }
}
