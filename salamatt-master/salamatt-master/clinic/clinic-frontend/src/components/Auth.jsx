import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace with your API base URL

const Auth = {
    login: async (email, password) => {
        try {
          const response = await axios.post('http://localhost:3000/users/login', {
            email,
            password,
          });
    
          if (response.status === 200) {
            localStorage.setItem('student_id', response.data.id); // Store user ID in local storage
            return response.data; // Return the user data upon successful login
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          throw new Error('Login failed');
        }
      },
    
      getCurrentUser: () => {
        const student_id = localStorage.getItem('student_id'); // Retrieve user ID from local storage
        return student_id ? { id: student_id } : null; // Return user object with ID or null if not found
      },
};

export default Auth;
