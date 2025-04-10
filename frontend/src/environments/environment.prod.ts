export const environment = {
    production: true,
    apiUrl: process.env['API_URL'],
    amplifyConfig: {
        Auth: {
            region: process.env['AWS_REGION'],
            userPoolId: process.env['USER_POOL_ID'],
            userPoolWebClientId: process.env['USER_POOL_WEB_CLIENT_ID']
        }
    }
}; 