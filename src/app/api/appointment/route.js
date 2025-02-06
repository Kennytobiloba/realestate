import { connectToDatabase } from "@/app/lib/mongodb/mongoose";
import Appointment from "@/app/model/appiontment";


export async function POST(req){
   await connectToDatabase()
    try {
    const body = await req.json()
    await Appointment.create(body)
    console.log(body, "data")
    return new Response(JSON.stringify(
        {message:"Appointment Sent"}
      ))
        
    } catch (error) {
        return new Response(JSON.stringify(
            {message:"Appointment Failed"}
        ))
          
        
    }
}

 export async function GET(req){
   await  connectToDatabase()
    try {
     const data =  await Appointment.find() 
       return new Response(JSON.stringify(
     {message:"Appointments fetched successfully", data}),
     {status:200}
    )    
    } catch (error) {
        return new Response(JSON.stringify({message:"Failed to fetch appointments"}))
        
    }
 }

  export async function DELETE(req){
    await connectToDatabase()
     try {
        const {id} = await req.json()
        console.log(id, "id")
       const data =   await Appointment.findByIdAndDelete(id)
        return new Response(JSON.stringify({message:"Appointment deleted successfully"}))
        
     } catch (error) {
        return new Response(JSON.stringify({message:"Failed to delete appointment"}))
        
     }
  }