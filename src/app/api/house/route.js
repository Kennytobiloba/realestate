import { connectToDatabase } from "@/app/lib/mongodb/mongoose";
import Houesemodel from "@/app/model/house";

export async function POST(req) {
    try {
      // Parse the JSON body from the request
      await connectToDatabase()
      const body = await req.json();
      // console.log(body, "data");
      const create = await Houesemodel.create(body)
      // Return the response with a JSON stringified object
      return new Response(
        JSON.stringify({
          message: "Apartment created successfully",
          data: create,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error(error);
      // Return a response with a failure message and status 500
      return new Response(
        JSON.stringify({ message: "Failed to create" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  //  Get request
   export  async function GET(req){
    await connectToDatabase()
    try {
      const houses = await Houesemodel.find({})
      // console.log("data", houses)
       return new Response(JSON.stringify(
        {message:"information fectch sucsessfully", houses}),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
      
    } catch (error) {
      console.log(error)
       return new Response(JSON.stringify(
        {message:"error in fetching information", error}),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
      
    }

   }

  //  delect request
   export async function DELETE(req){
    await  connectToDatabase()
    try {
      const  {id} = await req.json()
      //  console.log("id", id)
       await Houesemodel.findByIdAndDelete(id)
     return  new Response(JSON.stringify(
      {message:"Delected Successfully"},
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
     ))
      
    } catch (error) {
      console.log(error, "error")
      return new Response(JSON.stringify(
        {message:"Delected Successfully"},
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      ))
      
      
    }
   }

  // update request
   export async function PUT(req){
     await connectToDatabase()
     try {
      const {id, formData} = await req.json()
      console.log(id, formData)
      await Houesemodel.findByIdAndUpdate (id,  { $set: formData } ,{new:true , runValidators: true,})
       return new Response(JSON.stringify({message:"Updated Successfully"},
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
       ))
     } catch (error) {
      console.log("error", error)
      return new Response(JSON.stringify({message:"failed to update"},
        {
          status:500,
          headers: { "Content-Type": "application/json" },
        }
      ))
      
     }
   } 