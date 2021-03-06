from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Plan(models.Model):
	holder = models.ForeignKey(User)
	description = models.CharField(max_length = 500)
	destination = models.CharField(max_length = 200)
	limit = models.IntegerField()
	depart_time = models.DateTimeField()
	return_time = models.DateTimeField()
	is_private = models.BooleanField(default = False)
	def __str__(self):
		return self.destination+'.'+self.description
	def get_holder(self):
		return self.holder
class JoinedPlan(models.Model):
	joined_user = models.ForeignKey(User)
	joined_plan = models.ForeignKey(Plan)
	def __str__(self):
		return self.joined_user.__str__()+" join "+self.joined_plan.__str__()

class PrivatePlan(models.Model):
	accessible_user = models.ForeignKey(User)
	accessible_plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
	def __str__(self):
		return self.accessible_user.__str__()+" can see "+self.accessible_plan.__str__()

