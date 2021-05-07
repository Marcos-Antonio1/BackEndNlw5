import { io } from '../http';
import { ConnectionsServices } from '../services/ConnectionsService';
import { UserServices } from '../services/UserServices'; 
import { MessageService } from '../services/MessageServices';
import { Message } from '../entities/Message';
interface IParams {
    text:string,
    email:string
}

io.on("connect", (socket) => {
    const connectionServices= new ConnectionsServices()
    const usersService= new UserServices()
    const messagesServices = new MessageService()
    let user_id = null;

    socket.on("client_first_access",async(params)=>{
        
        const socket_id=socket.id;
        const {text, email}= params as IParams;

        const userExists = await usersService.findByEmail(email);
        if(!userExists){
            const user = await  usersService.create(email)
            
            await connectionServices.create({
                socket_id,
                user_id:user.id
            }) 
            user_id= user.id;
        }else{
            user_id=userExists.id;
            const connection= await connectionServices.findByUserId(userExists.id);

            if(!connection){
                await connectionServices.create({
                    socket_id,
                    user_id:userExists.id
                })

            }else{
                connection.socket_id= socket_id;
                await  connectionServices.create(connection)
            }
        }
        await messagesServices.create({
            text,
            user_id
        })
    });
});
