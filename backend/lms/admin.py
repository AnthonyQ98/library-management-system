from django.contrib import admin

# Register your models here.


from .models import Book

class LmsAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'available', 'rentee')

# Register your models here.

admin.site.register(Book, LmsAdmin)