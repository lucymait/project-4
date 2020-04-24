### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
# Project 4

by [Lucy Maitland](https://github.com/lucymait) and [Annie Kayal](https://github.com/annie-kayal)

## Overview

FITBOOK was my fourth project, with General Assembly, during the software engineering immersive course. Myself and Annie chose to work in a pair, to build a full-stack application within **one week**.

After lots of planning, we decicded to create a fitness class booking app, where users can:

- Search, Find & Book Fitness classes
- View a list of fitness classes, in your area and filter by activity-type (Yoya, Boxing, HIIT etc.)
- Book any fitness class and view their booking, in their profile page

Check out the top fitness classes in your area, [here]().

## Brief

- Choose to work solo or in a team
- Build a full-stack app, by making your own backend and your own front-end
- Use a Python Django API, using Django REST Framework to serve your data from a Postgres database
- Consume your API with a separate front-end, built with React
- Contain multiple relationships and CRUD function
ality
- Be deployed online and accessible to the public.

## Technologies Used

- JavaScript (ES6)
- React.js
- Python
- Django
- PostgreSQL
- HTML
- CSS, SCSS
- Bulma
- Axios
- Webpack
- Git and GitHub
- Heroku
- Moment
- Google Fonts

# Backend

## Approach 

When building our project; Django created a main project folder which contains all the project URLS and settings, including the database configuration. It also comes with a built-in CMS where the user can directly add, update and delete database records, and pre made authentication. The user needs to create a superuser in order to view the admin user section. 

Next we created our app (fitness) which is part of the project and has its own set of URLS, models, views and serializers. We can link our app into the Django project by modifying some settings in the project folder.

### Planning



## Models

It was crucial creating our models at stage 1, to ensure 

### 1. FITNESS

For the PostgreSQL database, we created five tables: Instructor, Gym, Fitness Class, Borough & Booked Class.

- The Instructor table consisted of a name so we could identify the instructor for each fitness class.
```js
class Instructor(models.Model):
  name = models.CharField(max_length=100)

  def __str__(self):
    return f'{self.name}'
```
- The Gym table also consisted of a name, but in addition, had a facilities field e.g parking, showers or lockers
```js
class Gym(models.Model):
  name = models.CharField(max_length=500)
  facilities = models.CharField(max_length=400)

  def __str__(self):
    return f'{self.name}'
```
- 
```js
class FitnessClass(models.Model):
  name = models.CharField(max_length=200)
  gym = models.ForeignKey(Gym, related_name='fitness', on_delete=models.CASCADE)
  activity_type = models.CharField(max_length=500)
  instructor = models.ForeignKey(Instructor, related_name='fitness', on_delete=models.CASCADE)
  description = models.CharField(max_length=1000)
  time_of_class = models.CharField(max_length=200)
  comment = models.ManyToManyField(Comment, related_name='fitness', blank=True)

  def __str__(self):
    return f'{self.name}'
```
```js
class Borough(models.Model):
  name = models.CharField(max_length=200)
  image = models.CharField(max_length=1000)
  fitnessclass = models.ManyToManyField(FitnessClass, related_name='fitness', blank=True)

  def __str__(self):
    return f'{self.name}'
```
```js
class BookedClass(models.Model):
  name = models.CharField(max_length=200)
  gym = models.CharField(max_length=200)
  activity_type = models.CharField(max_length=500)
  instructor = models.CharField(max_length=200)
  description = models.CharField(max_length=1000)
  time_of_class = models.CharField(max_length=200)
  data_booked = models.CharField(max_length=100)
  user = models.ForeignKey(User, related_name='fitness', on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.name}'
```

### 1. JWT_AUTH

Django provided us with a basic User, however we extended this by adding an image and email field. The image field was 'blank=true" and therefore it was not necessary for the user to provide one upon registration.

```js
class User(AbstractUser):
  image = models.ImageField(upload_to='profile_image', blank=True)
  email = models.EmailField(unique=True, error_messages={'unique':"This email has already been registered."})
  ```

## Views (API End-points)

### 1. JWT_AUTH (User)
```js
class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})
        return Response(serializer.errors, status=422)
 ```
```js
class LoginView(APIView):
    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Not Registered'})
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Incorrect Password'})
        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})
```
### 2. FITNESS
```js
class IsOwnerOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in permissions.SAFE_METHODS:
      return True
    
    return request.user == obj.user
```
```js
class AllFitnessClassView(APIView):
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request):
    fitness_classes = FitnessClass.objects.all()
    self.check_object_permissions(request, fitness_classes)
    serializer = PopulateFitnessClassSerializer(fitness_classes, many=True)
    return Response(serializer.data)
```
```js
class FitnessClassDetailView(APIView):
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request, pk):
    fitness_class = FitnessClass.objects.get(pk=pk)
    self.check_object_permissions(request, fitness_class)
    serializer = PopulateFitnessClassSerializer(fitness_class)
    return Response(serializer.data)
```

## Serializers

### 1. JWT_AUTH

```js
class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if not password:
            raise serializers.ValidationError({'password': 'Not a valid Password'})

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data 

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'image', 'password', 'password_confirmation','fitness')
        extra_kwargs = {
          'fitness' : {'required': False}
        }
```

### 2. FITNESS

```js
class FitnessClassSerializer(serializers.ModelSerializer):
  class Meta:
    model = FitnessClass
    fields = ('id', 'name', 'gym', 'activity_type', 'instructor', 'time_of_class', 'description', 'comment')
```
```js
class PopulateFitnessClassSerializer(serializers.ModelSerializer):
  instructor = InstructorSerializer()
  gym = GymSerializer()
  comment = CommentSerializer(many=True)

  class Meta:
    model = FitnessClass
    fields = ('id', 'name', 'gym', 'activity_type', 'instructor', 'time_of_class', 'description', 'comment')
```
## Authentication

# Frontend

## Screenshots

## Potential Future Features

- Add Live Comments to each fitness class
- Max Limit on class
- Time constraints on weekly classes (data configuration)
- Creating secure routes in app.js

## Lessons Learned

- A big lesson learnt was the importance of how well you design your schema. This will have a great impact on developing the frontend, to ensure the best user experience.
- Importance of configuring Django early e.g. configuring Images 
- Creating a fixture files early on, important in the time-frame
- User expierence (booking confirmation)