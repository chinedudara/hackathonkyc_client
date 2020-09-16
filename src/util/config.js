const prod = {
    apiUrl: 'https://us-central1-hackathonkyc.cloudfunctions.net/api'
};

const dev = {
    apiUrl: 'http://localhost:5000/hackathonkyc/us-central1/api'
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;

