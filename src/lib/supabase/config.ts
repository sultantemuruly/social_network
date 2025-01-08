import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  //   databaseId: import.meta.env.VITE_SUPABASE_DATABASE_ID,
  //   storageBucket: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET,
  //   userTable: import.meta.env.VITE_SUPABASE_USER_TABLE,
  //   postTable: import.meta.env.VITE_SUPABASE_POST_TABLE,
  //   savesTable: import.meta.env.VITE_SUPABASE_SAVES_TABLE,
};

// Initialize Supabase client
export const supabase: SupabaseClient = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

// Example functions for similar operations
export const account = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  },
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};

export const databases = {
  getTable: async (tableName: string) => {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) throw error;
    return data;
  },
  insert: async (tableName: string, values: Record<string, any>) => {
    const { data, error } = await supabase.from(tableName).insert(values);
    if (error) throw error;
    return data;
  },
};

export const storage = {
  upload: async (bucket: string, path: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    if (error) throw error;
    return data;
  },
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data?.publicUrl;
  },
};

export const avatars = {
  generate: async (text: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(text)}`;
  },
};
