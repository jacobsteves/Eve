<p align="center">
  <img src="assets/images/logo.png" height="100px"/>
</p>

[![Eve](https://img.shields.io/badge/Steves-Eve%20v1.0.0-brightgreen.svg)]()
[![PyPI](https://img.shields.io/pypi/l/Django.svg)]()

Eve is a web application allowing users to edit code on their website directly through their site.

## Features
- Create, Delete, Edit Files
- Automatic language detection and syntax highlighting
- Choose from over 30 text-editor themes
- Host multiple tabs of files
- Count number of lines in the project
- Export all files as zip


## Get Started
### Prerequisites
1. **Install [Node 4.0.0 or greater](https://nodejs.org)** - (5.0 or greater is recommended for optimal build performance). Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm).
2. **Install [Git](https://git-scm.com/downloads)**.
3. **[Disable safe write in your editor](http://webpack.github.io/docs/webpack-dev-server.html#working-with-editors-ides-supporting-safe-write)** to assure hot reloading works properly.

### Frontend
1. Run:
```
git clone https://github.com/jacobsteves/Eve.git
``` 
2. **Run the app:**
```
npm start -s
```
This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with this kit, this command will continue watching all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.

### Backend
1. **In a new terminal window, run:**
```
php -S localhost:8000
```
which will start the backend php server, running through port 8000.
- <i>Note:</i> if running on port 8000 will cause some issues for you, you can change this to whatever you want as long as you update the references to :8000 in the code

Then you're all good to go!


## Demo
[![https://gyazo.com/c23eba30339b0c71ccfe0b89df37a5a7](https://i.gyazo.com/c23eba30339b0c71ccfe0b89df37a5a7.gif)](https://gyazo.com/c23eba30339b0c71ccfe0b89df37a5a7)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jacobsteves/Eve/tags). 

## License

This project is licensed under the BSD-3-Clause - see the [LICENSE](LICENSE) file for details
