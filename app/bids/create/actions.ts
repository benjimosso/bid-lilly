'use server'

import { createClient } from "@/utils/supabase/server";

export async function insertItem(
  formData: FormData,
) {
  const supabase = createClient()
  //get user.
    const { data: user, error: userError } = await supabase.auth.getUser()
    if(userError) {
      console.log(userError)
    } else {
      console.log(user.user.email)
    }
  // convert the starting price to a number
  const startingPrice = formData.get('staringPrice')
  const startPrice = parseInt(startingPrice as string)
  // access file
    const file = formData.get('file') as File
    console.log(file)
    // upload the file to the storage
    const { data, error: Uploaderror } = await supabase.storage.from('bid-lilly').upload(`${file.name}`, file)
    if(Uploaderror) {
      console.log("ERROR UPLOAD",Uploaderror)
    } else {
      console.log('File uploaded')
    }
    // get url of the file
    const {data: url} = await supabase.storage.from('bid-lilly').getPublicUrl(`${file.name}`)
    console.log(url)
    // insert the item into the database
  const { error } = await supabase.from('items').insert([{ name: formData.get('name') as string, startingPrice: startPrice as number, image: url.publicUrl as string}]);
  if(error) {
    console.log(error)
  } else {
    console.log('Item added')
  }
  
}