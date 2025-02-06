import { connectToDatabase } from "@/app/lib/mongodb/mongoose"
import Agent from "@/app/model/agent"

export async function POST( req){
    
    await connectToDatabase()
    try {
        const {email, ...body} = await req.json()
         const emailExist = await Agent.findOne({email})
         if(emailExist){
            return new Response(JSON.stringify({message:"Email already Exist"},
                {
                  status:400,
                  headers: {
                     'Content-Type': 'application/json'
                  }
                }
                
            ))
         }
    const create = await Agent.create({...body, email})      
    return new Response(JSON.stringify({message:"Registration successfully"},
       {
        status:200,
        headers: {
            'Content-Type': 'application/json'
        }

     }))
        
    } catch (error) {
        return new Response(JSON.stringify(
            {message:"Registration Failed"},
            {
             status:500,
             headers: {
                 'Content-Type': 'application/json'
             }
    
          }))      
    }
   
}

export async function GET(req){
   await connectToDatabase()
   
   try {
    const findAgent =  await Agent.find()
     return new Response(JSON.stringify({message:"Fectch Successfully", data:findAgent},
        {
            status:200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
     ))
    
   } catch (error) {
     console.log("Failed to fetch", error)
     return new Response(JSON.stringify({message:"Failed to fetch"}))
    
   }
}


export async function PUT(req){
    await connectToDatabase()
    try {
       const {id , status} = await req.json()
       console.log(id, status, "info")
       await Agent.findByIdAndUpdate(id, {status}, {new:true}) 
       return new Response(JSON.stringify(
       {message:"Agent Updated Successfully"},
      
    ), {status:200})    
    } catch (error) {
        return new Response(JSON.stringify(
            {message:"Agent Updated Failed"},
            
         ),{status:200})    
        
    } 
}


export async function DELETE(req) {
   await connectToDatabase()
    try {
    const {id} = await req.json()
     await Agent.findByIdAndDelete(id)
     return new Response(JSON.stringify(
    {message:"Agent Delected Successfully"},
    {status:200}
    ))     
    } catch (error) {
    console.log("Error", error)     
    }
    
}