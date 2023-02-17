import React from 'react'
import './App.css';

import RecipesList from './components/RecipesList/RecipesList'
// import SearchBar from './components/RecipesList/SearchBar';
import MenuBar from './components/MenuBar/MenuBar'
import LoginPage from './components/Pages/LoginPage/LoginPage';
import SignupPage from './components/Pages/SignupPage/SignupPage'
import userService from './utils/userService';
import recipeService from './utils/recipeService';
import CreatePage from './components/CreatePage/CreatePage';
import RecipeDetailPage from './components/Pages/RecipeDetailPage/RecipeDetailPage';
import UpdatePageForm from './components/Pages/RecipeUpdatePage/UpdateForm';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  redirect,
  Navigate
} from "react-router-dom";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      recipes: [],
      user: userService.getUser(),
      
      isNewUserSignedUp: false
    }
    
    this.handleLogout = this.handleLogout.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
    this.updateRecipeListState = this.updateRecipeListState.bind(this)
    this.redirectToLogin = this.redirectToLogin.bind(this)
  }

  async componentDidMount(){
    /**make calls to api here, and update state if needed */
    //const response = await fetch('http://localhost:3001/api/users')

    //const data = await response.json()

    //this.setState({users: data})
    // const response = await fetch('http://localhost:3001/api/recipes')
    // const data = await response.json()
    // this.setState({recipes: data})

    const data = await recipeService.list()
    this.setState({ recipes: data })
  }
  componentDidUpdate(){
    console.log(`recipes = ${JSON.stringify(this.state.recipes)}`)
  }

  updateRecipeListState(data) {
    // this.setState(state => {
    //   return { recipes: [...state.recipes, data] }
    // })
    this.setState({recipes: [...this.state.recipes, data]});
    console.log(`recipes = ${this.state.recipes}`);
  }

  setCurrentUser(userData){
    this.setState({user: userData})
  }

  updateRecipe(data){
    recipeService.update(data);
  }

  // deleteRecipe(id) {
  //   recipeService.delete(id);
  // }

  async search(){
    /**implement the search function */
    
    /**think about sending the search key as a query parameter in your url */
  }

  handleLogout(){
    userService.logout();
    this.setState({ user: null });
  }
  
  redirectIfUser(){
    console.log('loader runs...')
    const currentUser = userService.getUser()
    if(currentUser){
      return redirect('/recipes')
    }
    return null
  }

  redirectToLogin(){
    // this.handleLogout();
    userService.logout();
    this.setState({ user: null });
    console.log('checking for user...')
    const currentUser = userService.getUser()
    if(!currentUser){
      console.log(`user logged out`);
      return redirect('/login')
    }
    else {
      console.log(`user not logged out`);
    }
    return null    
  }

  getMenu(){
    const menu = [
      {label: 'recipes', showAuth: this.state.user ? true: false},
      {label: 'create', showAuth: this.state.user ? true: false},
      {label: 'logout', showAuth: this.state.user ? true: false, hasLogoutOption: true},
      {label: 'login', showAuth: this.state.user ? false: true}, 
      {label: 'signup', showAuth: this.state.user ? false: true}
      
    ]
    console.log(`getMenu called. New menu = ${JSON.stringify(menu)}`);
    return menu
  }

  getRecipesOrlogin(){
    return this.state.user ? (<div className="container">
      <RecipesList recipes={this.state.recipes} />
      </div>) : <Navigate to='/login' replace />
  }

  getChildRoutes(){
    
    /**define child routes here and return them */
    /**element: this.state.user ? <Navigate to='/puppies' replace /> : <LoginPage setCurrentUser={this.setCurrentUser}/>
 */
    const routes = [
      {
        path: '/login',
        element:  <LoginPage setCurrentUser={this.setCurrentUser}/>,
        loader: this.redirectIfUser
       
      },
      {
        path: '/signup',
        element: <SignupPage setCurrentUser={this.setCurrentUser}/>,
        loader: this.redirectIfUser
        
      },
      {
        path: '/recipes',
        element: this.getRecipesOrlogin()
      },
      {
        path: '/create',
        element: <CreatePage updateRecipeListState={this.updateRecipeListState} />,
      },
      {
        path: '/recipes/:id',
        element: <RecipeDetailPage  updateRecipeListState={this.updateRecipeListState}/>,
      },
      {
        path: '/logout',
        element: <LoginPage />,
        loader: this.redirectToLogin
      },
      {
        path: '/recipes/:id/update',
        element: <UpdatePageForm  />,
      },


    ]

    return routes

  }
  

  getRouter(){
    let router = createBrowserRouter([{
      path: "/",
      element: (<>
              <MenuBar menuOptions={this.getMenu()}/>
              {/* <SearchBar /> */}
              <Outlet />
              
            </>

      ),
      /** */
      children: this.getChildRoutes()

    }])
    return router   
  }

  render(){
    return (
      <>
        <RouterProvider router={this.getRouter()} />     
        
      </>
     )  
  }
}

export default App;
