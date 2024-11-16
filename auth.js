import { supabase } from './supabase.js';

export async function signUpUser(email, password, name, avatar_url) {
    try {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name, avatar_url },
            },
        });

        if (error) {
            throw error;
        }

        alert('Sign-up successful! Please check your email to confirm.');
    } catch (error) {
        console.error('Sign-up error:', error.message);
        alert(`Error: ${error.message}`);
    }
}
