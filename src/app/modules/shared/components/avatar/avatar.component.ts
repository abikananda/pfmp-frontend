import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent implements OnInit {
  @Input() fullName = '';
  backgroundColor = '';

  ngOnInit(): void {
    const { firstName } = this.splitName(this.fullName);
    this.backgroundColor = this.getColorForLetter(firstName.charAt(0));
  }

  // Generate initials
  get initials(): string {
    const { firstName, lastName } = this.splitName(this.fullName);
    return (firstName?.charAt(0) + lastName?.charAt(0)).toUpperCase();
  }

  private getColorForLetter(letter: string): string {
    const colors: Record<string, string> = {
      A: '#E57373', B: '#64B5F6', C: '#81C784', D: '#FFD54F',
      E: '#BA68C8', F: '#F06292', G: '#4DB6AC', H: '#FF8A65',
      I: '#7986CB', J: '#A1887F', K: '#90A4AE', L: '#FF7043',
      M: '#D4E157', N: '#66BB6A', O: '#29B6F6', P: '#AB47BC',
      Q: '#EC407A', R: '#7E57C2', S: '#FFCA28', T: '#26C6DA',
      U: '#8D6E63', V: '#9CCC65', W: '#42A5F5', X: '#5C6BC0',
      Y: '#D81B60', Z: '#FF5722'
    };
    return colors[letter.toUpperCase()] || '#64B5F6'; // Default color
  }

  private splitName(fullName: string): { firstName: string, lastName: string } {
    const parts = fullName.trim().split(/\s+/);
    const firstName = parts.slice(0, parts.length - 1).join(' ');
    const lastName = parts[parts.length - 1];

    return {
      firstName: firstName + (firstName ? ' ' : ''),
      lastName: lastName || ''
    };
  }
}
