import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  private avatarSubject = new BehaviorSubject<string | null>(
    typeof window !== 'undefined' ? this.getAvatar() : null
  );
  avatar$ = this.avatarSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserProfile() {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const userProfile = JSON.parse(profile);
      console.log(userProfile);
      return userProfile;
    }
    return null;
  }

  getAvatar(): string | null {
    const avatar = localStorage.getItem('userAvatar');
    console.log('Avatar recuperado del localStorage:', avatar);
    return avatar;
  }

  setUserProfile(profile: any) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  setUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  setAvatar(avatarUrl: string): void {
    localStorage.setItem('userAvatar', avatarUrl);
    this.avatarSubject.next(avatarUrl);
  }

  getUserProfileImage(userName: string): string | null {
    const userProfile = localStorage.getItem(`profile_${userName}`);
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      return profile.uploadedCircleImage;
    }
    return '/assets/images/avatar1.png';
  }

  savePublication(publicacion: any, section: string) {
    let publicaciones = JSON.parse(localStorage.getItem(section) || '[]');

    const userProfileImage = this.getAvatar();
    const userName = this.getUsername();

    publicaciones.push({
      id: publicaciones.length + 1,
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      archivo: publicacion.archivo,
      userProfileImage: userProfileImage,
      userName: userName,
      likes: [],
    });

    localStorage.setItem(section, JSON.stringify(publicaciones));
  }

  getPublicationsBySection(section: string) {
    return JSON.parse(localStorage.getItem(section) || '[]');
  }

  getPublications() {
    return JSON.parse(localStorage.getItem('publicaciones') || '[]');
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any, isAdmin: boolean): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;

    return new Observable((observer) => {
      this.http
        .post<any>(loginUrl, credentials, { withCredentials: true })
        .subscribe(
          (response) => {
            this.setUsername(response.user_name);
            this.setUserProfile(response);
            this.setIsAdmin(response.isAdmin);

            console.log(
              response.isAdmin
                ? '¡Has iniciado sesión como admin!'
                : 'Has iniciado sesión como usuario normal.'
            );

            observer.next(response);
            observer.complete();
          },
          (error) => {
            console.error('Error al iniciar sesión:', error);
            observer.error(error);
          }
        );
    });
  }

  checkUsernameAvailability(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-username/${username}`);
  }

  checkEmailAvailability(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-email/${email}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  setIsAdmin(isAdmin: boolean): void {
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
  }

  isAdminUser(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getIsAdmin(): boolean {
    return JSON.parse(localStorage.getItem('isAdmin') || 'false');
  }
}
