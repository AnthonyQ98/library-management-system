from django.contrib import admin

# Register your models here.


from .models import Book, Member

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'available', 'rentee')

class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number', 'address', 'active')

# Register your models here.

admin.site.register(Book, BookAdmin)
admin.site.register(Member, MemberAdmin)