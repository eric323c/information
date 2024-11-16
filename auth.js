const email = document.getElementById('registerEmail').value;
const password = document.getElementById('registerPassword').value;
const name = document.getElementById('name')?.value || null;
const avatar_url = document.getElementById('avatar')?.value || null;

try {
    // Attempt to sign up the user
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Sign up error:', error);
        alert(`Error during sign up: ${error.message}`); // Display error message to the user
        return;
    }

    if (user) {
        console.log('User created:', user);

        // Insert user profile into the `users` table
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
            alert(`Error saving profile: ${insertError.message}`);
            return;
        }

        alert('Sign up successful! Welcome!');
        console.log('Profile saved:', data);
    }
} catch (e) {
    console.error('Unexpected error during signup:', e);
    alert('Unexpected error occurred. Check the console for details.');
}
