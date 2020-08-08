from django.shortcuts import render


def index(request):
    return render(request, 'reactApp/index.html')

def world(request):
    return render(request, 'reactApp/public/world.json')

def plane(request):
    return render(request, 'reactApp/public/plane.json')

def flare(request):
    return render(request, 'reactApp/public/flare-2.json')