import { deleteUserService,
    createUserService,
    getAllUsersService,
    getUsersByIdService,
    updateUserService,

 } from "../models/userModel.js";

//Standardized response function
const handleResponse = (res,status,message,data=null)=>{
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createUser = async (req , res , next) => {
    const {name , email} = req.body;
    try{
        const newUser = await createUserService(name, email);
        handleResponse(res, 201, "user created successfully", newUser)
    }catch(err){
        next(err);  
    }
};

export const getAllUsers = async (req , res , next) => {
    try{
        const users = await getAllUsersService();
        handleResponse(res, 200, "user fetched successfully", users)
    }catch(err){
        next(err);  
    }
};

export const getUserById = async (req , res , next) => {
    try{
        const user = await getUsersByIdService(req.params.id);
        if (!user)return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "user fetched successfully", user)
    }catch(err){
        next(err);  
    }
};

export const updateUser = async (req , res , next) => {
    const { name , email} = req.body;
    try{
        const updatedUser = await updateUserService(req.params.id,name, email);
        if (!user)return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "user updated  successfully", updatedUser)
    }catch(err){
        next(err);  
    }
};

export const deleteUser = async (req , res , next) => {
    try{
        const deletedUser = await deleteUserService(req.params.id);
        if (!user)return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "user deleted  successfully", deletedUser)
    }catch(err){
        next(err);  
    }
};