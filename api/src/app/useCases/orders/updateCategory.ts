import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function UpdateCategory(req: Request,res: Response){
   try{
    const {categoryId} = req.params;
    const {name, icon} = req.body;

   await Category.findByIdAndUpdate(categoryId, {name, icon});
   res.sendStatus(204);
   console.log(categoryId)

   } catch (error) {
    console.log(error);
    res.sendStatus(500);
   }
}
