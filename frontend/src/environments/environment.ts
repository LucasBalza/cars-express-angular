export const environment = {
    production: false,
    apiUrl: process.env['API_URL'] || 'http://localhost:5000/api',
    amplifyConfig: {
        Auth: {
            region: process.env['AWS_REGION'] || 'eu-west-1',
            userPoolId: process.env['USER_POOL_ID'],
            userPoolWebClientId: process.env['USER_POOL_WEB_CLIENT_ID']
        }
    }
}; 