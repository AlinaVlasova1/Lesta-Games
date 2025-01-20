const baseUrl = `https://vortex.korabli.su/api/`;

export class ApiUrlFactory {
    static create(pathname: string) : URL {
        const requestUrl = new URL(baseUrl);
        requestUrl.pathname += pathname;
        return requestUrl;
    }
}