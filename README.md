
# **Fill the Fridge**

[![Build Status](https://travis-ci.org/MetaMmodern/Fill-the-Fridge.svg?branch=feature_preparation)](https://travis-ci.org/MetaMmodern/Fill-the-Fridge)

## What is Fill the Fridge?

A web service, which helps you to make a dish from ingredients, which you have in your fridge.
If you don't have neccesary inridients, this service will find several options for stores and show you the best price for the unit. You will be able to select the nearest store and the store with lowest price.

## Main Functionality

1. Пользователь вводит в форму ингредиенты для приготовления User enters ingredients.
2. The service finds reciepts with that ingredients.
3. If the reciep has some unavailable ingredients, the service will give the ifo about this unit and path to the nearest store and to the store with lowest price.

## Parsers

A parser for [this website](https://google.com) is used to show reciepts. A parser for [this website](https://google.com) is used to define the prices  in stores. Google API and Maps are involved in project to show the store on map and to show the path to it.

## Technologies

### Frontend

- HTML5
- CSS3
- Bootstrap v.4
- JavaScript(ES6)
- AJAX

### Backend

- Node.js
- Koa js
- GoogleAPI
