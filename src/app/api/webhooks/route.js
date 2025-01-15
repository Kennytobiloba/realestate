import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs/server';
import { createOrUpdateUser, delectUser } from '@/app/lib/action/user';


export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', { status: 400 });
  }

  if (!evt?.data || !evt?.type) {
    return new Response('Error: Invalid webhook payload', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { first_name, last_name, image_url, email_addresses } = evt.data;

    try {
      const user = await createOrUpdateUser(id, first_name, last_name, email_addresses, image_url);
      console.log(`Received webhook with ID ${id} and event type of ${eventType}`);

      if (user && eventType === 'user.created') {
        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: { userMongoId: user._id },
          });
          console.log('User metadata updated successfully');
        } catch (error) {
          console.error('Error updating user metadata:', error);
        }
      }
    } catch (error) {
      console.error('Error creating or updating user:', error);
    }
  }

  if (eventType === 'user.deleted') {
    try {
      await delectUser(id);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error: Could not delete user', error);
      return new Response('Error: Could not delete user', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
}
