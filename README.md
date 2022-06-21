## TOE SCISSORS

### Overview

TOE SCISSORS is a blend of Rock Paper Scissors and Tic-Tac-Toe wrapped in a retro 8-bit theme. The interface and rules are simple,
but the AI difficulties ramp up in complexity. Combining the strategic elements of Tic-Tac-Toe on a 5x5 grid and the head-to-head battles of Rock Paper Scissors, the computer can act completely randomly on the easiest settings, to aggressively on the hardest.

### Features

#### User Guide

The comprehensive user guide covers the rules and flow of the game, from the synchronous turns, to tie breakers.

#### Game Board

The main view of the game features the game board, a scoreboard that keeps track of the number of tiles owned by each player, and conditionally rendered victory feedback and tie-handling. Each move that a user can make is represented by a custom-made 8-bit icon,
and the colors are based on the original 8-bit Nintendo color scheme, with each tile showing color and icon feedback indicative of its current state.

#### Victory Conditions

The player and the computer share a turn, each making a move at the same time. Both players choose a tile and either rock, paper, or scissors. When both players have played a move on a tile, the tile goes to whoever won that battle of Rock Paper Scissors. A tie is settled by a new round of Rock Paper Scissors until a winner is declared. Victory goes to the user who achieves five owned or played-on tiles in a row, either horizontally, vertically, or diagonally. If the end of the game is reached and no one has connected five tiles, whoever controls the most tiles wins.

#### The Stack

This is a front end app. It was built using React.js, JavaScript, HTML, and CSS.

#### Links

Live Site: https://toescissors.vercel.app/

Github Repo: https://github.com/rbannal86/toeScissors

## Created by Alex Bannow, 2020
