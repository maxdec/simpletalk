SimpleTalk
=======

Simple webapp to have voice conversations. It works with WebRTC and uses a Node.js/Express server and React for the frontend.

## Installation

This projects requires `nodejs`, `npm`, `redis`, `browserify`, `watchify` and `mocha` (for testing) to be installed.

Clone and install the dependencies:

```
git clone https://github.com/maxdec/simpletalk
cd simpletalk/
npm install
```

## Utilisation
Launch the app:

```
npm start
```

Launch Watchify:

```
npm run watch
```

Then open your browser at `http://localhost:3000`.

For **production** deployment you can run:

```
npm run build
```

to build `bundle.js` with Browserify.
