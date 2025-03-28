# yourapp/middleware.py
class GlobalPermissionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        exempt_paths = ['/admin/', '/accounts/', '/login/', '/static/', '/media/']
        if any(request.path.startswith(path) for path in exempt_paths):
            return self.get_response(request)
            
        # Book-related permissions based on method/action
        if request.path.startswith('/books/'):
            if request.method == 'GET':
                required_perm = 'lms.view_book'
            elif request.method == 'POST':
                required_perm = 'lms.add_book'
            elif request.method in ['PUT', 'PATCH']:
                required_perm = 'lms.change_book'
            elif request.method == 'DELETE':
                required_perm = 'lms.delete_book'
            else:
                required_perm = 'lms.view_book'
                
            if not request.user.is_authenticated or not request.user.has_perm(required_perm):
                from django.core.exceptions import PermissionDenied
                raise PermissionDenied
            
        return self.get_response(request)