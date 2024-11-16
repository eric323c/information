import { supabase } from './supabase.js';

export async function signUpUser(email, password, name, avatar_url) {
    try {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error('Error signing up:', error);
            alert(`Sign up failed: ${error.message}`);
            return;
        }

        // Insert additional profile data into `users` table
        const { data, error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    id: user.id,
                    name: name,
                    avatar_url: avatar_url,
                },
            ]);

        if (insertError) {
            console.error('Error inserting user profile:', insertError);
            alert(`Profile creation failed: ${insertError.message}`);
        } else {
            alert('Sign up successful! Welcome!');
        }
    } catch (e) {
        console.error('Unexpected error:', e);
        alert('Unexpected error occurred. Check console for details.');
    }
}
