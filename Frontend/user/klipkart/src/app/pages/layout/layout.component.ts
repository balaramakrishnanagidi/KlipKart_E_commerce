import { Component, OnInit } from '@angular/core';
import { faCartPlus, faUserEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    standalone: true,
    imports: [NgIf, NgClass, FaIconComponent, RouterLink, FormsModule]
})
export class LayoutComponent implements OnInit {

  cart = faCartPlus;
  user = faUserEdit;
  search = faMagnifyingGlass;
  total_cart_items = 0;
  isMenuOpen = false;
  isDropdownOpen = false;
  isToken = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('user_token');
    if (token) {
      this.isToken = true;
      }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    sessionStorage.removeItem('user_token');
    window.location.reload();
  }
}
