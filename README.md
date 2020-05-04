## ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
# Fitbook

by [Lucy Maitland](https://github.com/lucymait) and [Annie Kayal](https://github.com/annie-kayal)

<img src="./Images/Overview.png" width="600" height="400"/> <br/>

## Overview

Fitbook was my fourth project, with General Assembly, during the software engineering immersive course. Myself and Annie chose to work in a pair, to build a full-stack application within **one week**.

After lots of planning, we decided to create a fitness class booking app, where users can:

- Search, Find & Book Fitness classes
- View a list of fitness classes, in your area and filter by activity-type (Yoya, Boxing, HIIT etc.)
- Book any fitness class and view their booking, in their profile page

Check out the top fitness classes in your area, [here](https://fitbook-fitness.herokuapp.com/#/).

## Brief

- Choose to work solo or in a team
- **Build a full-stack application** by making your own backend and your own front-end
- **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- **Be deployed online** so it's publicly accessible.

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

When building our project; Django created a main project folder (for us) which contains all the project URLS and settings, including the database configuration. It also comes with a built-in CMS where the user can directly add, update and delete database records, and pre made authentication. 

First, we had to create a superuser in order to view the admin user section. Next we created our app (fitness) which is part of the project and has its own set of URLS, models, views and serializers. We can link our app into the Django project by modifying some settings in the project folder.

### Planning

In the first stage, we created our Entity Relationship Diagram (as seen below). This illustrated the different relationships between each model, whether its a one to many or many to many relationship. It was important deciding the relationships at an early stage, so that our models and database wasn't affected. 

<img src="./Images/Planning.png" width="600" height="400"/> <br/>

## Models

It was crucial creating our models at stage 1, to reduce having to drop your database and losing any crucial data.

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
- The Fitness Class table was our main model. This consisted of a fitness class name, gym, activity_type, instructor, description, time_of_class and comments. 

- A comments model was created at an early stage (as a bonus feature), however unfortunately we ran out of time and therefore didn't implement it. Although, now that it is in our models, it will make it much easier for the feature to be created in the future, as we already have the model in our backend.

- The FitnessClass model, had the following relationships: 
1. A one-to-many relationship with gym, signifying many fitness classes to one gym,
2. A one-to-many relationship with instructor, signifying many fitness classes to one instructor,
3. A many-to-many relationship with comments, signifying there can be many comments to many fitness classes.

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
- The Borough table consisted of a name, image and fitnessclasses. The fitnessclass had a many-to-many relationship to Boroughs, showing that there are many fitness classes in many boroughs.

```js
class Borough(models.Model):
  name = models.CharField(max_length=200)
  image = models.CharField(max_length=1000)
  fitnessclass = models.ManyToManyField(FitnessClass, related_name='fitness', blank=True)

  def __str__(self):
    return f'{self.name}'
```
- Finally our BookedClass table consisted of a name, gym, activity_type, instructor, description, time_of_class, date booked and user. 

- The bookedClass model has a one to many relationship with the user model, from the JWT Auth App. This shows that each user can have many booked classes. These booked classes will then be displayed in the users profile, in the front end.

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

Django provided us with a basic User, however we extended this by adding an image and email field. The image field was 'blank=true" and therefore it was not necessary for the user to provide one upon registration. It is this user model, which has a relationship with our bookedClass model in our Fitness App.

```js
class User(AbstractUser):
  image = models.ImageField(upload_to='profile_image', blank=True)
  email = models.EmailField(unique=True, error_messages={'unique':"This email has already been registered."})
  ```

## Views

The views in each app, highlighted our API End-points. 

### 1. JWT_AUTH (User)

- /register only has a post route, where the user's data is received and stored in the database.

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

 - /login has a get and post route, where the user's login information is received, checked and, if valid, a JWT token is returned as response.

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
- /profile has a GET, PUT and DELETE route, all relating to the user data of the user currently logged in, allowing them to respectively fetch, amend and delete their profile information.
```js
class ProfileView(APIView):
  permission_classes = (IsAuthenticated, )
  def get(self, request):
    user = User.objects.get(pk=request.user.id)
    serialized_user = PopulateUserSerializer(user)
    return Response(serialized_user.data)
```
### 2. FITNESS

- All our views in our Fitness App, used the API view from rest_framework. 

- Here are the urls for our fitness app views:

``` js
urlpatterns = [
  path('', AllFitnessClassView.as_view()),
  path('<int:pk>/', FitnessClassDetailView.as_view()),
  path('borough/', AllBoroughView.as_view()),
  path('borough/<int:pk>/', BoroughDetailView.as_view()),
  path('gym/', AllGymView.as_view()),
  path('gym/<int:pk>/', GymDetailView.as_view()),
  path('comment/', AllCommentView.as_view()),
  path('comment/<int:pk>/', CommentDetailView.as_view()),
  path('bookedclass/', BookedClassesView.as_view()),
  path('bookedclass/<int:pk>/', BookedClassDetailView.as_view())
]
```

- Django REST Framework comes with some powerful built in permissions. They are very simple to use and can be added any view by passing them as a list or tuple to a permission_classes property.

- IsOwnerOrReadOnly allows an unauthenticated user read only access eg: INDEX and SHOW, but only allows unsafe access, eg: CREATE, UPDATE and DELETE to Owner.

```js
class IsOwnerOrReadOnly(BasePermission):
  def has_object_permission(self, request, view, obj):
    if request.method in permissions.SAFE_METHODS:
      return True
    
    return request.user == obj.user
```

- As the admin is the only person who can post, delete and put any of the data (from the admin panel), we decided the user will only need a get route on all our views, apart from the Booked Class View

- The AllFitnessClassView gets all the fitness classes, whereas the FitnessClassDetailView gets a single fitness class.

```js
class AllFitnessClassView(APIView):
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request):
    fitness_classes = FitnessClass.objects.all()
    self.check_object_permissions(request, fitness_classes)
    serializer = PopulateFitnessClassSerializer(fitness_classes, many=True)
    return Response(serializer.data)

class FitnessClassDetailView(APIView):
  permission_classes = (IsOwnerOrReadOnly,)

  def get(self, request, pk):
    fitness_class = FitnessClass.objects.get(pk=pk)
    self.check_object_permissions(request, fitness_class)
    serializer = PopulateFitnessClassSerializer(fitness_class)
    return Response(serializer.data)
```
- The BookedClass View has a route for posting to the booked classes endpoint as well as getting and deleting a single booked class.

```js
class BookedClassesView(APIView):
  # queryset = BookedClass.objects.all()
  # serializer_class = BookedClassSerializer
  permissions_classes = (IsAuthenticated, )

  def post(self, request):
    request.data['user'] = request.user.id
    booked_class = BookedClassSerializer(data = request.data)
    if booked_class.is_valid():
      booked_class.save()
      return Response(booked_class.data, status=HTTP_202_ACCEPTED)
    return Response(status=HTTP_422_UNPROCESSABLE_ENTITY)

class BookedClassDetailView(APIView):
  def get(self, request, pk):
    booked_class = BookedClass.objects.get(pk=pk)
    serializer = BookedClassSerializer(booked_class)
    return Response(serializer.data)

  def delete(self, request, pk):
    booked_class = BookedClass.objects.get(pk=pk)
    booked_class.delete()
    return Response(status=HTTP_204_NO_CONTENT)
```


## Serializers

- The serializer sits in front of the model, it validates the data coming from the client, before it reaches the model, and it also serialises the data (turns it into a JSON string) after the model has retrieved the data from the database.

- The model property indicates which model the serializer should base its serialisation on, and the fields property defines which fields should be output to the JSON string, or be included when validating the data from the client.

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

- We can now use our serializers in the view, to not only convert the database data into JSON, but also to turn the client request data into model instances ready to be saved to the database.

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

# Frontend

## Screenshots

### Home Page
<img src="./Images/Home.png" width="225" height="400"/> <br/>

<img src="./Images/Home2.png" width="800" height="550" />

### Register Page
<img src="./Images/Register.png" width="225" height="400"/>

### Login Page
<img src="./Images/Login.png" width="225" height="400"/>

### Borough Page
<img src="./Images/Borough.png" width="225" height="400"/>

### Fitness Classes Page
<img src="./Images/Classes.png" width="225" height="400"/>

### Single Fitness Class Page
<img src="./Images/Class.png" width="225" height="400"/>

### Booking Confirmation Page
<img src="./Images/Booking.png" width="225" height="400"/>

### Profile Page
<img src="./Images/Profile.png" width="225" height="400"/>

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