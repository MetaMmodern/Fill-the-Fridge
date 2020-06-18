# <div style="text-align: center">**Fill the Fridge**</div>

[![Build Status](https://travis-ci.org/MetaMmodern/Fill-the-Fridge.svg?branch=feature_preparation)](https://travis-ci.org/MetaMmodern/Fill-the-Fridge)

## What is Fill the Fridge?

A web service, which helps you to make a dish from ingredients, which you have in your fridge.
If you don't have neccesary ingridients, this service will find several options for stores and show you the best price for the unit. You will be able to select the nearest store and the store with lowest price.

## Main Functionality

1. User types ingredients.
2. The service finds recipes with that ingredients.
3. If the recipe has some unavailable ingredients, the service will give the info about this unit and path to the nearest store and to the store with lowest price.

## Parsers

A parser for [this website](https://www.povarenok.ru/) is used to show recipes. A parser for [this website](http://mysupermarket.org.ua/) is used to define the prices in stores. Google API and Maps are involved in project to show the store on map and to show the path to it.

## Technologies

### Frontend

- HTML5
- CSS3
- Bootstrap 4
- JavaScript(ES6-ES11)
- AJAX(XMR) /&nbsp;Fetch API
- Webpack

### Backend

- Node.js
  - needle
  - cheerio
  - Ejs
- Koa.js
- Google API
