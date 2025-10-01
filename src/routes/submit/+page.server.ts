// import type { PageServerLoad } from './$types';
// import { supabase } from '$lib/supabaseClient';

// type Instrument = 
// {  
//     id: number;  
//     name: string;
// };

// export const load: PageServerLoad = async () => {  
//     const { data, error } = await supabase.from('instruments').select<'instruments', Instrument>();  
//     if (error) {    
//         console.error('Error loading instruments:', error.message);
//         return { instruments: [] };
//     }  
    
//     return {    
//         instruments: data ?? [], };
//     };

// ------------------------------------------
// export const actions: PageServerLoad = {
//   default: async ({ request }) => {
//     const formData = await request.formData();

//     const name = formData.get('name') as string;
//     const team = formData.get('team') as string;
//     const model = formData.get('model') as string;
//     const notes = formData.get('notes') as string;
//     const file = formData.get('file') as File | null;

//     // Upload file to Supabase storage
//     if (file) {
//       const buffer = Buffer.from(await file.arrayBuffer());
//       const { error: uploadError } = await supabase.storage
//         .from('submissions')
//         .upload(`pdfs/${file.name}`, buffer, {
//           contentType: file.type
//         });

//       if (uploadError) {
//         console.error(uploadError);
//         return { success: false, error: 'File upload failed' };
//       }
//     }

//     // Insert into DB
//     const { error: dbError } = await supabase
//       .from('submissions')
//       .insert([{ name, team, model, notes }]);

//     if (dbError) {
//       console.error(dbError);
//       return { success: false, error: 'DB insert failed' };
//     }

//     return { success: true };
//   }
// };

// src/routes/submit/+page.server.ts
import type { Actions } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

export const prerender = false;
const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// server action
export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const team = String(form.get('team') ?? '');
    const model = String(form.get('model') ?? '');
    const file = form.get('file') as File | null;

    let filePath: string | null = null;

    if (file && file.size > 0) {
      // pick a unique filename
      const filename = `${Date.now()}_${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabaseAdmin.storage
        .from('submissions')
        .upload(filename, buffer, { contentType: file.type });

      if (uploadError) {
        console.error('upload error', uploadError);
        return { success: false, error: 'upload_failed' };
      }

      filePath = filename;
    }

    const { error: insertError, data } = await supabaseAdmin
      .from('submissions')
      .insert([{ team, model, file_path: filePath }])
      .select();

    if (insertError) {
      console.error('db insert error', insertError);
      return { success: false, error: 'db_failed' };
    }

    return { success: true, row: data?.[0] ?? null };
  }
};