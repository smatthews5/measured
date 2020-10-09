# Reference Guide (for consistency)

### Git commits

- Commit often — at least once for every hour of focused coding

- Before committing, address any reasonable linting errors and format with prettier

- Commit to your branch, submit a pull request, request a review

- Respond to review requests quickly and read the code closely — refactor if needed

- Write commit messages in lowercase, present tense, and start with a category:
  - **feat:** implement ApiService funcs for login/signup
  	(*new feature that materially changes the code*)
  	
  - **fix:** update useEffect dependencies to to trigger reload at logout
  	(*code to fix a bug... even if the problem's not yet solved*)
  	
  - **refactor:** extract DrinkBuilder filtering functions into own file

    (*edits to the structure or logic of the code, for an existing feature*)

  - **style:** change alignment of header and galleries on homepage

    (*add new front-end styling, including features/colors/tweaks to design/etc*)

  - **chore:** update prettier config/formatting scripts

    (*changes to the config files, build, etc.*)

  - **test:** test homepage recipe displays

  - **misc:** update README with project pitch

    (*if it definitely doesn't fit categories above: changes to docs, etc.* )

    

### Variables

- Camelcase in general, capitalise component names
- Start function names with a verb: *setState,* *calculateScore*, *retrieveUserBar*
- Start functions that maintain boolean flags with toggle: *toggleLoading*
- Start boolean flags with 'is': *isAuthenticated*
- Avoid similar variable names in different files: keep them specific and descriptive, and try to be consistent with plurals (ingredientList =/= ingredientsList)
- Make sure to change variable names if they are no longer accurate for the thing they describe!

 

### Comments

- Add plenty of *short,* descriptive comments!! Frequent comments are ideal to narrate the flow of code
- Keep comments to one line — briefly describe any function whose purpose is not self-evident
- Add a 'TODO:' comment flag to any line or section of code that is incomplete or unstable, and describe what needs to be done



## Front-end folder structure

—  pages
|		|——Home
|		|——Ingredients
|		|——MyBar
|		|——DrinkBuilder 
|		|——RecipeDetail
|		|——Login/Signup ???
|
|—  containers
|		|——CardGallery
|		|——CardDetailList
|		|——CardSuggestionContainer
|		|——ShakerContainer
|
|—  components
|		|——Banner
|		|——Card
|		|——CardDetail
|		|——CardSuggestion
|		|——Header
|		|——HeaderLarge
|		|——Search
|		|——Shaker