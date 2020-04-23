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

- Build a full-stack app
- Use a Python Django API, using Django REST Framework to serve your data from a Postgres database
- Consume your API with a separate front-end, built with React
- Contain multiple relationships and CRUD functionality
- Be deployed online and accessible to the public.

## Technologies Used

- JavaScript (ES6)
- React.js
- Python
- Django
- PostgreSQL
- HTML
- CSS, Bulma & SCSS
- Axios
- Git and GitHub
- Heroku
- Moment
- Google Fonts

# Backend

## Approach 

## Models

### 1. JWT_AUTH

```js
class User(AbstractUser):
  image = models.ImageField(upload_to='profile_image', blank=True)
  email = models.EmailField(unique=True, error_messages={'unique':"This email has already been registered."})
  ```

### 2. FITNESS

## Views

### 1. JWT_AUTH

### 2. FITNESS

## Serializers

### 1. JWT_AUTH

### 2. FITNESS

## Authentication

# Frontend

## Screenshots

## Potential Future Features

- Add Live Comments to each fitness class

## Lessons Learned

- A big lesson learnt was the importance of how well you design your schema. This will have a great impact on developing the frontend, to ensure the best user experience.
