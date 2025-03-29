from django.contrib import admin
from .models import Book, Rental, CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

# Custom UserAdmin to support the custom User model with additional fields
class CustomUserAdmin(BaseUserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    ordering = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'address')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {'fields': ('username', 'password1', 'password2')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'address')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'author', 'genre', 'available', 'rentee')

class RentalAdmin(admin.ModelAdmin):
    readonly_fields = ['rented_at']
    list_display = ('get_book_title', 'member', 'rented_at', 'returned_at')

    def get_book_title(self, obj):
        return obj.book.title
    get_book_title.short_description = 'Book Title'  # Customize column header for readability

# Register the models with their respective admin classes
admin.site.register(Book, BookAdmin)
admin.site.register(Rental, RentalAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
