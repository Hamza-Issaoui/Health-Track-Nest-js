import { Request } from 'express';
import { Users } from '../users/user.entity';
 
interface RequestWithUser extends Request {
  user: Users;
}
 
export default RequestWithUser;