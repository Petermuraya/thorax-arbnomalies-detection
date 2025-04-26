
import { supabase } from '@/integrations/supabase/client';

export const getImageUrl = async (path: string) => {
  const { data } = await supabase.storage
    .from('chest-xrays')
    .getPublicUrl(path);
  
  return data.publicUrl;
};
