from django.http import HttpResponse
from django.template import RequestContext, loader
from travelplans.plan_manager import PlanManager
from django.shortcuts import render,redirect,render_to_response
from django.contrib.auth import logout
from travelplans import facebook_proxy

def available_plans(request):
    try:
        user=request.user
        if not user.is_authenticated():
            return redirect('login')
        pm=PlanManager()
        available_plans=pm.get_all_available_plans(user)
        friend_list = facebook_proxy.all_friends_names(user)
        # print friend_list
        template = loader.get_template('travelplans/view_plans.html')
        context = RequestContext(request, {
            'plan_list': available_plans,
            'list_title': "All Available Plans",
            'friend_list': friend_list
        })
        return HttpResponse(template.render(context))
    except Exception as e:
        print str(e)
        # logout(request)
        return render_to_response('travelplans/error.html',{'error_message': str(e)})


def my_plans(request):
    try:
        user=request.user
        if not user.is_authenticated():
            return redirect('login')
        pm=PlanManager()
        my_plans=pm.get_plans_by_user(user)
        friend_list = facebook_proxy.all_friends_names(user)
        template = loader.get_template('travelplans/view_plans.html')
        context = RequestContext(request, {
            'plan_list': my_plans,
            'list_title': "All My Plans",
            'friend_list': friend_list
        })
        return HttpResponse(template.render(context))
    except Exception as e:
        print str(e)
        # logout(request)
        return render_to_response('travelplans/error.html',{'error_message': str(e)})


def joined_plans(request):
    try:
        user=request.user
        if not user.is_authenticated():
            return redirect('login')
        pm=PlanManager()
        joined_plans=pm.get_joined_plans(user)
        friend_list = facebook_proxy.all_friends_names(user)
        template = loader.get_template('travelplans/view_plans.html')
        context = RequestContext(request, {
            'plan_list': joined_plans,
            'list_title': "All Joined Plans",
            'friend_list': friend_list
        })
        return HttpResponse(template.render(context))
    except Exception as e:
        print str(e)
        # logout(request)
        return render_to_response('travelplans/error.html',{'error_message': str(e)})


def view_plan_detail(request,planid):
    try:
        user=request.user
        if not user.is_authenticated():
            return redirect('login')
        pm = PlanManager()
        plan=pm.get_plan_by_id(planid)
        if plan is None:
            raise Exception("this plan do not exist")
        if plan.holder.is_superuser:
            picture_url = ''
        else:
            holder_fb = plan.holder.social_auth.filter(provider = 'facebook').first()
            holder_fb_id = holder_fb.uid
            picture_url = facebook_proxy.get_picture_url(holder_fb_id)
            
        if pm.viewable(user,plan):
            template = loader.get_template('travelplans/plan_detail.html')
            friend_list = facebook_proxy.all_friends_names(user)
            context = RequestContext(request, {
            'plan': plan,
            'editable':pm.editable(user,plan),
            'sharable':pm.sharable(user,plan),
            'joinable':pm.joinable(user,plan),
            'joiners':pm.get_all_joiners(plan),
            'has_joined':pm.has_joined_plan(user,plan),
            'picture_url':picture_url,
            'friend_list': friend_list
            })
            return HttpResponse(template.render(context))
        else:
            # change to error page
            raise Exception("the plan is not available")
    except Exception as e:
        print str(e)
        # logout(request)
        return render_to_response('travelplans/error.html',{'error_message': str(e)})  
        
def help(request):
    try:
        template = loader.get_template('travelplans/help.html')
        context = RequestContext(request)
        return HttpResponse(template.render(context))
    except Exception as e:
        print str(e)
        # logout(request)
        return render_to_response('travelplans/error.html',{'error_message': str(e)})  
