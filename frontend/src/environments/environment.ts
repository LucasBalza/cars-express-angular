export const environment = {
    production: false,
    apiUrl: (window as any).__env?.API_URL || 'http://localhost:5000/api',
    amplifyConfig: {
        Auth: {
            region: (window as any).__env?.AWS_REGION || 'eu-west-1',
            userPoolId: (window as any).__env?.USER_POOL_ID,
            userPoolWebClientId: (window as any).__env?.USER_POOL_WEB_CLIENT_ID
        }
    }
}; 