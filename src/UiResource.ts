export class UiResource{
    static readonly Main: string = "/";


    static getRedirectUri(): string | null {
        const currentLocation = window.location.href;
        const url = new URL(currentLocation);
        return url.searchParams.get("redirectUri");
    }
}