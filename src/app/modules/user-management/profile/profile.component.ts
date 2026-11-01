import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

export interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  profileImage: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserProfile = {
    fullName: '',
    email: '',
    bio: '',
    profileImage: '',
  };
  originalUser: UserProfile = {
    fullName: '',
    email: '',
    bio: '',
    profileImage: '',
  };
  hasChanges = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe((data) => {
      this.user = data;
      this.originalUser = { ...data }; // Store original state
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.profileImage = (e.target?.result as string);
          this.checkChanges();
        };
        reader.readAsDataURL(file);
      }
    }
  }
  // Get initials from the full name
  getInitials(): string {
    const parts = this.user.fullName.split(' ');
    return parts.length > 1
      ? parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      : parts[0].charAt(0);
  }
  checkChanges() {
    this.hasChanges = JSON.stringify(this.user) !== JSON.stringify(this.originalUser);
  }

  saveProfile() {
    this.user.profileImage = '';
    this.profileService.updateProfile(this.user).subscribe((updatedProfile) => {
      this.originalUser = { ...updatedProfile };
      this.hasChanges = false;
      alert('Profile updated successfully!');
    });
  }
}
