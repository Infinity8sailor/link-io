# interface/views.py
from django.shortcuts import render, redirect
from django.http import HttpResponse
import json
from django.views.generic import View 
from . import forms
   
#from rest_framework.views import APIView 
#from rest_framework.response import Response 
with open("interface/data.json") as f:
            data=json.load(f)
            f.close 
 
def dump_data(edited_data):
        with open("interface/data.json","w") as f:
            json.dump(edited_data,f)
            f.close

def hackthone(post_data):
    hackthone_name=post_data['hackthone_name']
    hackthone_start=post_data['hackthone_start']
    hackthone_end=post_data['hackthone_end']
    hackthone_link=post_data['hackthone_link']
    hackthone_reg=post_data['hackthone_reg']    
    data["hackthones"][hackthone_name]=[ hackthone_start, hackthone_end, hackthone_link, hackthone_reg]
    dump_data(data)

def tasks(post_data):
    task_name=post_data["task_name"]
    task_completion=post_data["task_completion"]
    task_deadline=post_data["task_deadline"]
    #task_extra=post_data["task_extra"]
    data["tasks"][task_name]=[task_completion,task_deadline]
    dump_data(data)

def topic_sub_topic(post_data):
    project_name=post_data["project_name"]
    if "new_topic_name" in post_data and "new_topic_name"!="":
        topic_name=post_data["new_topic_name"]
        data["projects"][project_name][2][topic_name]=[]
        if "sub_topic_name" in post_data:
            sub_topic_name=post_data["sub_topic_name"]
            print("done")
            data["projects"][project_name][2][topic_name].append(sub_topic_name)

    if "topic_name" and "sub_topic_name" in post_data and "new-topic_name"=="":
        sub_topic_name=post_data["sub_topic_name"]
        topic_name=post_data["topic_name"]
        data["projects"][project_name][2][topic_name].append(sub_topic_name)
    dump_data(data)

def index0(request):
    context ={"data" : data }
    if request.method=="POST":
        if 'hackthone_name' in request.POST:
            hackthone(request.POST)
        if "task_name" in request.POST:
            tasks(request.POST)
        if "topic_name" or "new_topic_name" in request.POST:
            topic_sub_topic(request.POST)        

    return render(request,'interface/root.html' , context)

def home(request):
    return render(request,'interface/home.html')

def charts(request):
    return render(request,'interface/charts.html')    

def g_docs(request):
    context ={"data" : data }
    return render(request, 'interface/google_docs.html', context)        

def react(request):
    context ={"data" : data }
    return render(request, 'interface/react.html', context)        


"""
class HomeView(View): 

    def get(self, request, *args, **kwargs): 
        context ={"data" : data1 }
        return render(request, 'interface/root.html' , context) 
   

  
class ChartData(APIView): 
    authentication_classes = [] 
    permission_classes = [] 
   
    def get(self, request, format = None): 
        labels = [ 
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
        ]
        chartLabel = "my data"
        chartdata = [10,30,20,10,10,60,40,20,30,100,20,70,10,10,10,20,30,0,] 
        chartdata1= [100,30,80,40,80,40,40,30,10,20,60,50,50,0,70,40,80,50,]
        data ={ 
                     "labels":labels, 
                     "chartLabel":chartLabel, 
                     "chartdata":chartdata,
                     "chartdata1" : chartdata1, 
             } 
        return Response(data)    
        

        """