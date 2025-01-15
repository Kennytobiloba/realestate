import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server'
import { createOrUpdateUser, delectUser } from '@/app/lib/action/user'

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) 
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
    
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt?.data
  const eventType = evt?.type
//   webhooks  clerk/docs configude webhooks
 if(eventType === "user.created" || eventType === "updated"){
   const {first_name, last_name, imgage_url , email_addresses} = evt?.data
   try {
    const user = await createOrUpdateUser(first_name, last_name, imgage_url , email_addresses)
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log(first_name , "name", "name")
    if(user && eventType ==="user.created"){
      try {
        await clerkClient.users.updateUserMetadata(id,{
          publicMetadata:{
            userMongoId: user._id,
          }
        })
        
      } catch (error) {
        console.log("Error: Could not update user metadata", error)
        
      }
    }  
   } catch (error) {
   
   }  
 }
 

 if(evt.type === "user.deleted"){
    try {
      await delectUser(id)  
    } catch (error) {
      console.log("Error: Could not delect users")
      return new Response("Error:Could not delect user",{
        status: 500,
      }
       
      )
      
    }
 }
  return new Response('Webhook received', { status: 200 })
}