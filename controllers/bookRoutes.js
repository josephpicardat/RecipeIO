const router = require('express').Router();
const withAuth = require('../utils/auth');
const {Book, Recipe, User} = require('../models');
const bcrypt = require('bcrypt')

//LIST OF THE COOKBOOKS
router.get('/',withAuth, async (req, res) => {
  try {
      const allBooks = await Book.findAll( {
        where: {
          user_id: req.session.user_id
        }
      });

      const bookData = allBooks.map((book) => book.get({plain: true}));
      // const bookData = allBooks.get({ plain: true });

      // console.log('GET /books | bookData' + bookData);

      res.json(bookData);

      // res.render('books', {
      //   bookData,
      //   logged_in: req.session.logged_in,
      // });
    } catch (err) {
      res.status(500).json(err);
    }
});

//CHOSEN BOOK
router.get('/:name',withAuth, async (req, res) => {


    try {
      const desiredBook = await Book.findOne( { 
        where: { 
          title: req.params.name 
        } 
      });

      const book = desiredBook.get({plain: true});

        res.render('home', {
          book,
          logged_in: req.session.logged_in,
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

//COOKBOOK LIST OF RECIPES
router.get('/:name/recipes',withAuth, async (req, res) => {

  try {
      const allReciepes = await Recipe.findAll( {
        where: {
          user_id: req.params.user_id
        }
      });

      const recipes = allReciepes.map((reciepe) => reciepe.get({plain: true}));

      res.render('TEMP_RECIPES', {
        recipes,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

//INDIVIDUAL RECIPE
router.get('/:name/recipes/:id',withAuth, async (req, res) => {

  const desiredBook = await Book.findOne( { 
    where: { 
      title: req.params.name 
    } 
  });

  try {
    const desiredRecipe = await Book.findOne( {
      where: {
        name: req.params.name
      }
    });

    const myRecipe = desiredRecipe.get({plain: true});

      res.render('home', {
        myRecipe,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});



module.exports = router;