import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  user: any = {};
  updateSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!)['id'];
    this.getUserData();
  }

  getUserData() {
    const apiUrl = `${environment.apiUrl}/users/${this.userId}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.user = data;
    });
  }

  updateUser() {
    const apiUrl = `${environment.apiUrl}/users/${this.userId}`;
    this.http.put(apiUrl, this.user).subscribe(
      (data: any) => {
        this.updateSuccess = true;
        this.errorMessage = ''; // Reset error message
        this.user = data; // Optionally update your user object
      },
      (error: any) => {
        this.updateSuccess = false;
        this.errorMessage = 'Error updating profile. Please try again.'; // Set error message
        console.error('Update error:', error);
      }
    );
  }
}
