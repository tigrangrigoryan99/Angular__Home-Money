export class AuthService {
    private isAuthenticated: boolean = false;

    login(): void {
        this.isAuthenticated = true;
    }

    logout(): void {
        this.isAuthenticated = false;
        window.localStorage.clear();
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
}